import { DeleteOutlined } from '@ant-design/icons';
import { userAddress, userPreviousAddress } from '../../../@types';
import { Button } from '../../design-system/buttons';
import { FlexContainer } from '../../flex-container';
import { Flex, Input } from 'antd';
import LabeledDateInputMolecule from '../../LabeledDateInput/LabeledDateInput.molecule';

type PreviousAddressProps = {
  previousAddress: userPreviousAddress;
  currentAddress: userAddress;
  handleDeleteAddress: (key: string) => void;
  handlePreviousAddressChange: (
    field: keyof userPreviousAddress,
    value: string,
    key: string,
  ) => void;
  index: string;
  error: string;
  allAddresses: {
    [key: string]: userPreviousAddress;
  };
  beingInCurrentAddress7Plus: boolean;
};

const PreviousAddress = ({
  handlePreviousAddressChange,
  previousAddress,
  handleDeleteAddress,
  index,
  error,
  allAddresses,
  currentAddress,
  beingInCurrentAddress7Plus,
}: PreviousAddressProps) => {
  return (
    <div>
      <Flex className="text-4xl my-8 justify-between ">
        <span>Previous Address {index}</span>
        <span>
          {(beingInCurrentAddress7Plus ||
            Object.keys(allAddresses).length !== 1) &&
            Object.keys(allAddresses).length === +index && (
              <Button
                bordered
                onClick={() => handleDeleteAddress(index)}
                danger
                icon={<DeleteOutlined />}
              >
                Delete Address {index}
              </Button>
            )}
        </span>
      </Flex>
      <div className="flex w-full gap-10 p-2 md:px-0 flex-col md:flex-row flex-wrap">
        <FlexContainer label="Street Address" required>
          <Input
            className="h-[40px] text-left"
            value={previousAddress.street}
            onChange={(e) =>
              handlePreviousAddressChange(
                'street',
                e.target.value,
                index,
              )
            }
            placeholder="Boulevard Street Address"
          />
        </FlexContainer>
        <FlexContainer label="Unit" required>
          <Input
            className="h-[40px] text-left"
            value={previousAddress.unit}
            onChange={(e) =>
              handlePreviousAddressChange('unit', e.target.value, index)
            }
            placeholder=""
          />
        </FlexContainer>{' '}
        <FlexContainer label="City" required>
          <Input
            className="h-[40px] text-left"
            value={previousAddress.city}
            onChange={(e) =>
              handlePreviousAddressChange('city', e.target.value, index)
            }
            placeholder="San Francisco"
          />
        </FlexContainer>{' '}
      </div>{' '}
      <div className="flex w-full gap-10 p-2 md:px-0 flex-col md:flex-row flex-wrap">
        <FlexContainer label="State" required>
          <Input
            className="h-[40px] text-left"
            value={previousAddress.state}
            name="state"
            onChange={(e) =>
              handlePreviousAddressChange('state', e.target.value, index)
            }
            placeholder="Texas"
          />
        </FlexContainer>
        <FlexContainer label="Zip" required>
          <Input
            className="h-[40px] text-left"
            value={previousAddress.zipCode}
            name="zip"
            onChange={(e) =>
              handlePreviousAddressChange('zipCode', e.target.value, index)
            }
            placeholder=""
          />
        </FlexContainer>{' '}
        <FlexContainer label="Country" required>
          <Input
            className="h-[40px] text-left"
            name="country"
            value={previousAddress.country}
            onChange={(e) =>
              handlePreviousAddressChange('country', e.target.value, index)
            }
            placeholder="United States"
          />
        </FlexContainer>{' '}
      </div>
      <div className="flex w-full gap-10 p-2 md:px-0 flex-col md:flex-row flex-wrap">
        <FlexContainer label="">
          <LabeledDateInputMolecule
            label="Date move in"
            required
            value={previousAddress.dateMovedIn}
            name="dateMovedIn"
            onDateChange={(_, v) =>
              handlePreviousAddressChange('dateMovedIn', v, index)
            }
            maxDate={
              index === '1'
                ? currentAddress.dateMovedIn
                : allAddresses[(+index - 1).toString()].dateMovedOut
            }
            picker="date"
          />
        </FlexContainer>{' '}
        <FlexContainer label="">
          <LabeledDateInputMolecule
            label="Date move out"
            required
            value={previousAddress.dateMovedOut}
            name="dateMovedOut"
            onDateChange={(_, v) =>
              handlePreviousAddressChange('dateMovedOut', v, index)
            }
            disabled={!previousAddress.dateMovedIn}
            minDate={previousAddress.dateMovedIn}
            maxDate={
              index === '1'
                ? currentAddress.dateMovedIn
                : allAddresses[(+index - 1).toString()].dateMovedIn
            }
            picker="date"
          />
        </FlexContainer>
        <div className="flex-1"></div>
      </div>
      {error && <div className="text-errorColor mt-4">{error}</div>}
    </div>
  );
};

export default PreviousAddress;

import { FlexContainer } from '../../flex-container';
import {  Input } from 'antd';
import { userAddress } from '../../../@types';
import { toJavaLocalDateString } from '../../../utils/date-time';
import LabeledDateInputMolecule from '../../LabeledDateInput/LabeledDateInput.molecule';

type CurrentAddressProps = {
  currentAddress: userAddress;
  handleCurrentAddressChange: (field: keyof userAddress, value: string) => void;
  error: string;
};

const CurrentAddress = ({
  currentAddress,
  handleCurrentAddressChange,
  error,
}: CurrentAddressProps) => {
  return (
    <div>
      <div className="text-4xl my-8">Current Address</div>
      <div className="flex w-full gap-10 p-2 md:px-0 flex-col md:flex-row flex-wrap">
        <FlexContainer label="Street Address" required>
          <Input
            className="h-[40px] text-left"
            value={currentAddress.street}
            onChange={(e) =>
              handleCurrentAddressChange('street', e.target.value)
            }
            placeholder="Boulevard Street Address"
          />
        </FlexContainer>
        <FlexContainer label="Unit" required>
          <Input
            className="h-[40px] text-left"
            value={currentAddress.unit}
            onChange={(e) => handleCurrentAddressChange('unit', e.target.value)}
            placeholder=""
          />
        </FlexContainer>{' '}
        <FlexContainer label="City" required>
          <Input
            className="h-[40px] text-left"
            value={currentAddress.city}
            onChange={(e) => handleCurrentAddressChange('city', e.target.value)}
            placeholder="San Francisco"
          />
        </FlexContainer>{' '}
      </div>{' '}
      <div className="flex w-full gap-10 p-2 md:px-0 flex-col md:flex-row flex-wrap">
        <FlexContainer label="State" required>
          <Input
            className="h-[40px] text-left"
            value={currentAddress.state}
            name="state"
            onChange={(e) =>
              handleCurrentAddressChange('state', e.target.value)
            }
            placeholder="Texas"
          />
        </FlexContainer>
        <FlexContainer label="Zip" required>
          <Input
            className="h-[40px] text-left"
            value={currentAddress.zipCode}
            name="zip"
            onChange={(e) =>
              handleCurrentAddressChange('zipCode', e.target.value)
            }
            placeholder=""
          />
        </FlexContainer>{' '}
        <FlexContainer label="Country" required>
          <Input
            className="h-[40px] text-left"
            name="country"
            value={currentAddress.country}
            onChange={(e) =>
              handleCurrentAddressChange('country', e.target.value)
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
            value={currentAddress.dateMovedIn}
            name="dateMovedIn"
            onDateChange={(_, v) => handleCurrentAddressChange('dateMovedIn', v)}
            maxDate={toJavaLocalDateString(new Date(), false)}
            picker="date"
          />
        </FlexContainer>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
      </div>
      {error && <div className="text-errorColor mt-4">{error}</div>}
    </div>
  );
};

export default CurrentAddress;

import {
  initialReferenceRecord,
  ReferenceDirtyState,
  ReferenceValidState,
  useReferencesDocument,
} from '../onboarding.hooks';
import { Card, Flex, Input, Modal, Select } from 'antd';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { FlexContainer } from '../../flex-container';
import { useEffect } from 'react';
import {
  Button,
  ButtonPrimary,
} from '../../../components/design-system/buttons';
import PhoneNumberInput from '../../PhoneNumberInput/phone-number-input.component';
import LabeledDateInputMolecule from '../../LabeledDateInput/LabeledDateInput.molecule';
import { toJavaLocalDateString } from '../../../utils/date-time';
import { Reference } from '../../../@types';
import { ErrorLabel } from '../../Input/ErrorLabel';
import { getValidityMessage } from '../../../utils/domHelpers';
import TemplateHeadAtom from '../../TemplateHead/TemplateHead.atom';
import {
  RelationshipWithCandidate,
  ValidationPattern,
} from '../../../constants';
import dayjs from 'dayjs';

interface ReferenceFormProps {
  reference: Reference;
  index: number;
  onInputChange: (
    index: number,
    fieldName: keyof Reference,
    value: string,
  ) => void;
  onValidityChange: (
    key: string,
    fieldName: string,
    valid: boolean,
    message?: string,
  ) => void;
  onBlur: (key: string, fieldName: keyof Reference, value?: string) => void;
  isDirty: ReferenceDirtyState;
  validity: ReferenceValidState;
  isDisAllowedEmail: (index: number, email: string) => boolean;
  onDelete: (index: number, identifier: string) => void;
  totalReferences: number;
  isLast: boolean;
  handleAddReference: () => void;
}
const ReferenceForm = ({
  reference,
  index,
  onInputChange,
  onValidityChange,
  validity,
  isDisAllowedEmail,
  onDelete,
  isLast,
  totalReferences,
  handleAddReference,
}: ReferenceFormProps) => {
  const identifier = String(reference?.id ?? reference?.generatedId ?? index);

  // Get validation states for this reference
  const getValidity = (field: keyof Reference) => {
    return (
      validity[identifier]?.[field] || { valid: undefined, message: undefined }
    );
  };

  // Common input handler
  const handleChange =
    (field: keyof Reference) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onInputChange(index, field, e.target.value);

      if (field === 'firstName' || field === 'lastName') {
        const isValid = Boolean(e.target.value.trim());
        onValidityChange(
          identifier,
          field,
          isValid,
          !isValid ? getValidityMessage(e) : 'Enter a valid name',
        );
      }
      // Special handling for email uniqueness
      if (field === 'email') {
        const isInvalid = isDisAllowedEmail(index, e.target.value);
        onValidityChange(
          identifier,
          field,
          !isInvalid && ValidationPattern.emailReg.test(e.target.value),
          isInvalid
            ? 'Email must be unique'
            : getValidityMessage(e) ?? 'Email is required',
        );
      }
    };

  // Relationship-specific validation
  useEffect(() => {
    if (reference.relationshipWithCandidate === 'Other') {
      const isValid = !!reference.otherRelationshipWithCandidate?.trim();
      onValidityChange(
        identifier,
        'otherRelationshipWithCandidate',
        isValid,
        isValid ? undefined : 'Required when selecting "Other"',
      );
    } else {
      onValidityChange(
        identifier,
        'otherRelationshipWithCandidate',
        true,
        undefined,
      );
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    reference.otherRelationshipWithCandidate,
    reference.relationshipWithCandidate,
  ]);

  // Render individual reference fields here
  return (
    <div key={`reference-${identifier}`} className="pb-12 mb-4">
      <p className="text-body text-textColor border-b-2">{`Reference ${index + 1}`}</p>
      <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
        <FlexContainer label="First Name" className="relative" required>
          <Input
            value={reference.firstName || undefined}
            name="firstName"
            onChange={handleChange('firstName')}
            placeholder="John"
            required
            disabled={reference?.id != null}
          />
          <ErrorLabel
            error={getValidity('firstName').message}
            className="absolute"
          />
        </FlexContainer>
        <FlexContainer label="Last Name" className="relative" required>
          <Input
            value={reference.lastName || undefined}
            onChange={
              handleChange('lastName')
              // handleInputValidityChange(identifier, e);
            }
            placeholder="Doe"
            name="lastName"
            required
            // status={
            //   !getValidity('lastName').valid && isDirty[identifier]?.lastName
            //     ? 'error'
            //     : ''
            // }
            // onBlur={(e) => onBlur(identifier, 'lastName', e.target.value)}
            disabled={reference?.id != null}
          />
          <ErrorLabel
            error={getValidity('lastName').message}
            className="absolute"
          />
        </FlexContainer>
      </div>

      <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
        <FlexContainer label="Email Address" className="relative" required>
          <Input
            value={reference.email || undefined}
            onChange={handleChange('email')}
            placeholder="Email address"
            type="email"
            name="email"
            disabled={reference?.id != null}
          />
          <ErrorLabel
            error={getValidity('email').message}
            className="absolute"
          />
        </FlexContainer>
        <FlexContainer label="Phone Number" className="relative" required>
          <PhoneNumberInput
            value={reference.phone}
            onChange={(e, valid) => {
              onInputChange(index, 'phone', e);
              onValidityChange(
                identifier,
                'phone',
                Boolean(valid),
                e != null && e?.trim() != ''
                  ? 'Invalid Phone Format'
                  : 'Phone number is required',
              );
            }}
            onDialChange={(d) => {
              onInputChange(index, 'dial', d ?? '');
            }}
            dial={reference.dial?.toString()}
            name="phone"
            disabled={reference?.id != null}
          />
          <ErrorLabel
            error={!(reference?.id != null) ? getValidity('phone').message : ''}
            className="absolute"
          />
        </FlexContainer>
      </div>
      <div className="flex w-full gap-8 flex-col mt-[20px] md:flex-row flex-wrap">
        <FlexContainer label="Medical Center">
          <Input
            value={reference.company || undefined}
            onChange={handleChange('company')}
            placeholder="Your facility's name"
            disabled={reference?.id != null}
          />
        </FlexContainer>
        <FlexContainer label="Unit">
          <Input
            value={reference.unit || undefined}
            onChange={handleChange('unit')}
            placeholder="Unit name"
            disabled={reference?.id != null}
          />
        </FlexContainer>
      </div>
      <div className="flex w-full gap-8 flex-col md:flex-row mt-[20px] relative">
        <LabeledDateInputMolecule
          label="Known since"
          required
          value={reference.startDate}
          onDateChange={(_, e) => {
            const isValid = dayjs(e, 'YYYY-MM-DD').isValid();

            onInputChange(
              index,
              'startDate',
              isValid ? dayjs(e).format('YYYY-MM-DD') : '',
            );
            onValidityChange(
              identifier,
              'startDate',
              isValid,
              !isValid ? 'Start date is required' : '',
            );
          }}
          maxDate={toJavaLocalDateString(new Date(), false)}
          name="startDate"
          picker="date"
          disabled={reference?.id != null}
        />
        <LabeledDateInputMolecule
          label="Known until"
          required
          disabled={!reference.startDate || reference?.id != null}
          minDate={reference.startDate}
          value={reference.endDate}
          onDateChange={(_, e) => {
            const isValid = dayjs(e, 'YYYY-MM-DD').isValid();
            onInputChange(
              index,
              'endDate',
              isValid ? dayjs(e).format('YYYY-MM-DD') : '',
            );
            onValidityChange(
              identifier,
              'endDate',
              isValid,
              !isValid ? 'End date is required' : '',
            );
          }}
          name="endDate"
          picker="date"
        />
      </div>
      <div className="flex w-full gap-8 flex-col md:flex-row mt-[20px]">
        <FlexContainer
          label="Relationship to Reference"
          className="relative"
          required
        >
          <Select
            options={Object.entries(RelationshipWithCandidate).map(
              ([k, v]) => ({
                label: v,
                value: k,
              }),
            )}
            value={
              reference.relationshipWithCandidate
                ? reference.relationshipWithCandidate
                : undefined
            }
            onChange={(value) => {
              onInputChange(index, 'relationshipWithCandidate', value);
              onInputChange(index, 'otherRelationshipWithCandidate', '');
            }}
            // onChange={(value) => {
            //   onInputChange(index, 'relationshipWithCandidate', value);
            //   onInputChange(index, 'otherRelationshipWithCandidate', '');

            //   // Validate relationshipWithCandidate
            //   const isValid = !!value;
            //   // handleValidityChange(
            //   //   identifier,
            //   //   'relationshipWithCandidate',
            //   //   isValid,
            //   //   isValid ? undefined : 'Relationship is required',
            //   // );

            //   // Handle Other relationship
            //   if (value === 'Other') {
            //     // Mark other field as dirty and invalid if empty
            //     handleBlur(identifier, 'otherRelationshipWithCandidate');
            //     handleValidityChange(
            //       identifier,
            //       'otherRelationshipWithCandidate',
            //       false,
            //       'This field is required',
            //     );
            //   } else {
            //     // Clear other field validation
            //     handleValidityChange(
            //       identifier,
            //       'otherRelationshipWithCandidate',
            //       true,
            //       undefined,
            //     );
            //   }
            // }}
            placeholder="Relationship"
            disabled={reference?.id != null}

            // required
          />
          {/* <ErrorLabel
            error={
              isDirty[identifier]?.relationshipWithCandidate &&
              RelationshipWithCandidateValidity &&
              !RelationshipWithCandidateValidity.valid
                ? RelationshipWithCandidateValidity.message
                : undefined
            }
            className="absolute"
          /> */}
        </FlexContainer>
        {reference.relationshipWithCandidate === 'Other' ? (
          <FlexContainer
            label='If "Other" specify'
            className="relative"
            required
          >
            <Input
              value={reference.otherRelationshipWithCandidate || undefined}
              onChange={handleChange('otherRelationshipWithCandidate')}
              placeholder="Specify"
              name="otherRelationshipWithCandidate"
              required
              // status={
              //   !getValidity('otherRelationshipWithCandidate').valid &&
              //   isDirty[identifier]?.otherRelationshipWithCandidate
              //     ? 'error'
              //     : ''
              // }
              // onBlur={() =>
              //   onBlur(identifier, 'otherRelationshipWithCandidate')
              // }
              disabled={reference?.id != null}
            />
            <ErrorLabel
              error={getValidity('relationshipWithCandidate').message}
              className="absolute"
            />
          </FlexContainer>
        ) : (
          <div className="flex-1"></div>
        )}
      </div>
      {/* Add more input fields for each reference */}
      <div className="flex w-full gap-8 justify-between flex-wrap mt-[40px]">
        {' '}
        <Button
          danger
          onClick={() => onDelete(index, identifier)}
          icon={<DeleteOutlined />}
        >
          Delete Reference
        </Button>
        {isLast && totalReferences < 3 ? (
          <ButtonPrimary
            icon={<UserAddOutlined />}
            onClick={handleAddReference}
          >
            Add Reference
          </ButtonPrimary>
        ) : null}
      </div>
    </div>
  );
};
export const References = () => {
  const {
    isLoading,
    references,
    markedForDelete,
    disableSubmit,
    validity,
    isDirty,
    deleteModal,
    deletingIndex,
    setReferences,
    onSubmit,
    onPrevious,
    onDelete,
    setValidity,
    isDisAllowedEmail,
    setDirty,
    setDeleteModal,
    setDeletingIndex,
    setMarkedForDelete,
  } = useReferencesDocument();

  const handleAddReference = () => {
    setReferences([
      ...references,
      {
        firstName: '',
        lastName: '',
        facility: '',
        unit: '',
        title: '',
        startDate: '',
        endDate: '',
        phone: '',
        email: '',
        company: '',
        relationshipWithCandidate: '',
        generatedId: String(
          window.crypto?.randomUUID() ?? new Date().getTime(),
        ),
      },
    ]);
  };
  const Validate = (key: keyof Reference, value: string) => {
    if (key === 'email') {
      return ValidationPattern.emailReg.test(value);
    }

    if (key === 'startDate' || key === 'endDate') {
      console.log(dayjs(value, 'YYYY-MM-DD').isValid());

      return dayjs(value, 'YYYY-MM-DD').isValid();
    }
    if (key === 'otherRelationshipWithCandidate') {
      return value.trim().length > 0;
    }
    return true;
  };

  const handleValidityChange = (
    key: string,
    fieldName?: string,
    valid?: boolean,
    message?: string,
  ) => {
    setValidity((v) => ({
      ...(v ?? {}),
      [key]: {
        ...(v[key] ?? {}),
        [String(fieldName)]: {
          valid,
          message: valid ? undefined : message,
        },
      },
    }));
  };

  const onInputChange = (
    index: number,
    fieldName: keyof (typeof references)[number],
    value: string,
  ) => {
    setReferences((references) => {
      const updatedReferences = [...references];
      updatedReferences[index] = {
        ...(updatedReferences[index] ?? {}),
        [fieldName]: value,
      };
      return updatedReferences;
    });
  };
  const handleBlur = (
    key: string,
    fieldName: keyof (typeof references)[number],
    value?: string,
  ) => {
    setDirty((prev) => {
      const updatedState = { ...(prev ?? {}) };
      updatedState[key] = {
        ...(updatedState[key] ?? {}),
        [fieldName]: true,
      };
      return updatedState;
    });

    handleValidityChange(
      key,
      fieldName.toString(),
      Validate(fieldName, value ?? ''),
    );
  };

  useEffect(() => {
    if (references.length === 0) {
      setReferences([
        {
          ...initialReferenceRecord,
          generatedId: String(
            window.crypto?.randomUUID() ?? new Date().getTime(),
          ),
        },
      ]);
    }
  }, [references, setReferences]);

  return (
    <>
      {references && (
        <Card
          className="p-[10px] h-[800px] overflow-auto"
          title={
            <h2 className="md:text-subHeading text-smallSubHeading font-[600] flex text-textColor">
              References (at least 2)
            </h2>
          }
        >
          {references.map((reference, index) => (
            <>
              <ReferenceForm
                key={reference.id || reference.generatedId}
                reference={reference}
                index={index}
                onInputChange={onInputChange}
                onValidityChange={handleValidityChange}
                onBlur={handleBlur}
                isDirty={isDirty}
                validity={validity}
                isDisAllowedEmail={isDisAllowedEmail}
                onDelete={onDelete}
                isLast={index === references.length - 1}
                totalReferences={references.length}
                handleAddReference={handleAddReference}
              />
            </>
          ))}

          <div className="flex w-full gap-8 justify-center md:justify-end flex-wrap mt-[40px]">
            <Button bordered onClick={onPrevious}>
              <ArrowLeftOutlined />
              Previous
            </Button>
            <ButtonPrimary
              disabled={disableSubmit}
              onClick={onSubmit}
              loading={isLoading}
            >
              Continue <ArrowRightOutlined />
            </ButtonPrimary>
          </div>
        </Card>
      )}

      <Modal
        onCancel={() => {
          setDeleteModal(false);
          setMarkedForDelete(null);
          setDeletingIndex(-1);
        }}
        open={deleteModal && deletingIndex > -1}
        footer={null}
        title={
          <TemplateHeadAtom
            title={`Delete Reference ${deletingIndex + 1}`}
            caption=""
          />
        }
        centered
        width={500}
      >
        <p style={{ fontWeight: 800 }}>
          {`Are you sure you want to delete reference ${deletingIndex + 1}?`}
        </p>
        <p>This action is permanent and cannot be undone</p>
        <Flex className="flex justify-between mt-[50px] gap-4">
          <Button
            bordered
            onClick={() => {
              setDeleteModal(false);
              setDeletingIndex(-1);
              setMarkedForDelete(null);
            }}
          >
            Cancel
          </Button>
          <Button
            bordered
            onClick={() => {
              onDelete(
                deletingIndex,
                String(markedForDelete?.id ?? markedForDelete?.generatedId),
              );
              setDeleteModal(false);
              setDeletingIndex(-1);
            }}
            danger
            icon={<DeleteOutlined />}
          >
            Delete Reference
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default References;

import { Button, Form, Input, Select } from 'antd';
import './index.scss';
import { Fragment, useState } from 'react';
import { SubmitButton } from '../design-system/buttons/SubmitButton';
import {
  Candidate,
  ClinicalContact,
  InterviewBookingDetails,
  UserProfile,
} from '../../@types';
import { RequiredMark } from '../Input/RequiredMark';
import { useManageLocation } from '../../hooks/common.hooks';

type InfoProps = Candidate &
  Pick<UserProfile, 'ssn'> & { clinicalContacts?: ClinicalContact[] };
export const PersonalInfoForm = (
  props: Partial<InterviewBookingDetails> & {
    candidate?: Candidate;
    onSubmit?: (values: Partial<Candidate>) => Promise<void>;
    onDismiss?: () => void;
  },
) => {
  const [form] = Form.useForm<InfoProps>();
  const [loading, setLoading] = useState(false);
  const onFinish = (values: Partial<Candidate>) => {
    setLoading(true);
    props
      .onSubmit?.(values)
      .then(() => {
        setLoading(false);
        props.onDismiss?.();
      })
      .catch(() => setLoading(false));
  };
  const {
    city,
    // state,
    // zipCode,
    setCity,
    setState,
    countries,
    setZipCode,
    setCountry,
    zipOptions,
    cityOptions,
    stateOptions,
    placesLoading,
    loading: locationLoader,
  } = useManageLocation();
  return (
    <Form
      onFinish={onFinish}
      // size="small"
      layout="vertical"
      colon={false}
      form={form}
      initialValues={{
        ...(props.candidate ?? {}),
      }}
      requiredMark={(label, { required }) => {
        return (
          <Fragment>
            {label}
            {required ? <RequiredMark /> : null}
          </Fragment>
        );
      }}
    >
      <div className="flex flex-row flex-wrap gap-4">
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'First Name is Required' }]}
          className="flex-1"
        >
          <Input
            className="gohst-input"
            placeholder="Enter Full Name"
            // size="small"
            // allowClear
          />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Last Name is Required' }]}
          className="flex-1"
        >
          <Input
            // allowClear
            className="gohst-input"
            placeholder="Enter Last Name"
            // size="small"
          />
        </Form.Item>
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email is Required', type: 'email' },
          ]}
          className="flex-1"
        >
          <Input
            // allowClear
            className="gohst-input"
            type="email"
            placeholder="Enter Email"
            // size="small"
          />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: 'Phone Number is Required' }]}
          className="flex-1"
        >
          <Input
            // allowClear
            className="gohst-input"
            placeholder="Enter Phone Number"
            // size="small"
          />
        </Form.Item>
      </div>
      <div className="flex flex-row flex-wrap  gap-4">
        <Form.Item
          label="Country"
          name="country"
          className="flex-1"
          rules={[{ required: true, message: 'Country is Required' }]}
        >
          <Select
            placeholder="Select Country"
            options={
              countries
                ? Object.keys(countries).map((key) => ({
                    label: `${key} ${countries[key].flag}`,
                    value: key,
                  }))
                : []
            }
            allowClear
            showSearch
            filterOption={(input, option) =>
              String(option?.label ?? '')
                .toLowerCase()
                .startsWith(input?.toLowerCase?.())
            }
            filterSort={(optionA, optionB) =>
              String(optionA?.label ?? '')
                .toLowerCase?.()
                .localeCompare(String(optionB?.label ?? '').toLowerCase?.())
            }
            loading={placesLoading}
            onChange={(e) => {
              setCountry(e);
            }}
          />
        </Form.Item>
        {/* <Form.Item
          label="Country"
          name="country"
          rules={[
            {
              required: props?.candidate?.country != null,
              message: 'Country is Required',
            },
          ]}
          className="flex-1"
        >
          <Input
            // allowClear
            className="gohst-input"
            placeholder="Enter Country"
            // size="small"
          />
        </Form.Item> */}
        <Form.Item
          label="State"
          name="state"
          className="flex-1"
          rules={[{ required: true, message: 'State is Required' }]}
        >
          <Select
            placeholder="Select State"
            options={
              stateOptions?.map((s) => ({
                label: s.name,
                value: s.name,
              })) ?? []
            }
            // disabled={form?.getFieldValue('state') != null}
            allowClear
            showSearch
            loading={locationLoader.fetchingStates}
            filterOption={(input, option) =>
              String(option?.label ?? '')
                .toLowerCase()
                .startsWith(input?.toLowerCase?.())
            }
            filterSort={(optionA, optionB) =>
              String(optionA?.label ?? '')
                .toLowerCase?.()
                .localeCompare(String(optionB?.label ?? '').toLowerCase?.())
            }
            onChange={(e) => {
              setState(e);
              setCity('');
              form.setFieldValue('city', '');
              form.setFieldValue('zipCode', '');
              setZipCode('');
            }}
          />
        </Form.Item>

        {/* <Form.Item
          label="State"
          name="state"
          rules={[
            {
              required: props?.candidate?.state != null,
              message: 'State is Required',
            },
          ]}
          className="flex-1"
        >
          <Input
            // allowClear
            className="gohst-input"
            placeholder="Enter State"
            // size="small"
          />
        </Form.Item> */}
      </div>
      <div className="flex flex-row flex-wrap  gap-4">
        <Form.Item
          label="City"
          name="city"
          className="flex-1"
          rules={[{ required: true, message: 'City is Required' }]}
          shouldUpdate
        >
          <Select
            placeholder="Select City"
            options={
              cityOptions?.map((s) => ({ label: s.name, value: s.name })) ?? []
            }
            loading={
              // form?.getFieldValue('state') != null && cities == null
              locationLoader.fetchingCities
            }
            allowClear
            showSearch
            filterOption={(input, option) =>
              String(option?.label ?? '')
                .toLowerCase()
                .startsWith(input?.toLowerCase?.())
            }
            filterSort={(optionA, optionB) =>
              String(optionA?.label ?? '')
                .toLowerCase?.()
                .localeCompare(String(optionB?.label ?? '').toLowerCase?.())
            }
            onChange={(e) => {
              setCity(e);
              setZipCode('');
              form.setFieldValue('zipCode', '');
            }}
          />
        </Form.Item>
        {/* <Form.Item
          label="City"
          name="city"
          rules={[
            {
              required: props?.candidate?.city != null,
              message: 'City is Required',
            },
          ]}
          className="flex-1"
        >
          <Input
            // allowClear
            className="gohst-input"
            placeholder="Enter City"
            // size="small"
          />
        </Form.Item> */}
        <Form.Item
          label="Zip Code"
          name="zipCode"
          rules={[{ required: true, message: 'Zip code is Required' }]}
          className="flex-1"
        >
          {/* <Input
              type="text"
              placeholder="0000"
              onChange={(e) => {
                form.setFieldsValue({ zip: e.target.value });
              }}
            /> */}
          <Select
            placeholder="Select zip code"
            options={
              zipOptions?.map((s) => ({ label: s.label, value: s.value })) ?? []
            }
            loading={form?.getFieldValue('state') != null && city == null}
            allowClear
            showSearch
            filterOption={(input, option) =>
              String(option?.label ?? '')
                .toLowerCase()
                .startsWith(input?.toLowerCase?.())
            }
            filterSort={(optionA, optionB) =>
              String(optionA?.label ?? '')
                .toLowerCase?.()
                .localeCompare(String(optionB?.label ?? '').toLowerCase?.())
            }
            onChange={(e) => {
              setZipCode(e);
            }}
          />
        </Form.Item>
        {/* <Form.Item
          label="Zip Code"
          name="zipCode"
          rules={[
            {
              required: props?.candidate?.zipCode != null,
              message: 'Zip Code is Required',
            },
          ]}
          className="flex-1"
        >
          <Input
            // allowClear
            className="gohst-input"
            placeholder="Enter Zip code"
            // size="small"
          />
        </Form.Item> */}
      </div>
      <div className="flex flex-row flex-wrap  gap-4">
        <Form.Item
          label="Street Address"
          name="address"
          rules={[{ required: true, message: 'Street Address is Required' }]}
          className="flex-1"
        >
          <Input
            // allowClear
            className="gohst-input"
            placeholder="Enter Street Address"
            // size="small"
          />
        </Form.Item>
        <div className="flex-1"></div>
      </div>
      <div className="flex flex-row flex-wrap justify-end gap-4 items-center">
        <Form.Item key="reset" className="flex justify-end px-[24px]">
          <Button htmlType="reset" type="text">
            Reset
          </Button>
        </Form.Item>
        <Form.Item key="submit" className="flex justify-end px-[24px]">
          <SubmitButton form={form} loading={loading}>
            Save
          </SubmitButton>
        </Form.Item>
      </div>
    </Form>
  );
};

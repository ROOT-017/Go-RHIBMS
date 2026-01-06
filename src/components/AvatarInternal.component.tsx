import { Avatar, AvatarProps, Select } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { usePrincipal } from '../hooks/common.hooks';
import { RoleName } from '../constants';
import { useDispatch, useSelector } from '../store';
import { Fragment } from 'react/jsx-runtime';
import { centerActions } from '../store/features/slices/center';

export const AvatarInternal = ({
  icon,
  style,
  size,
  fullname,
  ...props
}: AvatarProps & { fullname?: boolean }) => {
  const principal = usePrincipal();
  const medicalCenters = useSelector((state) => state.medicalCenters.payload);
  const disptach = useDispatch();
  const fullName = principal?.candidate
    ? `${principal?.candidate?.firstName ?? ''} ${principal?.candidate?.lastName ?? ''}`
    : medicalCenters?.active?.centerName;
  const getInitials = () => {
    let arr: string[] = [];
    if (principal?.role?.name === RoleName.HR_ADMIN) {
      if (medicalCenters?.active) {
        arr = medicalCenters.active?.centerName?.split(' ') ?? [];
      }
    } else if (principal?.clinicalContact?.firstName != null) {
      arr = `${principal?.clinicalContact?.firstName ?? ''} ${principal?.clinicalContact?.lastName ?? ''}`.split(' ');
    } else {
      arr = fullName?.split(' ') ?? [];
    }
    return arr && arr?.length > 2
      ? arr
          ?.slice(0, 2)
          .map((s) => s[0])
          .join('')
      : arr?.map((s) => s[0]).join('');
  };
  const getIon = () => {
    if (icon) {
      return icon;
    } else if (principal?.role?.name === RoleName.USER) {
      return principal?.candidate ? getInitials() : <UserOutlined />;
    } else if (principal?.role?.name === RoleName.HR_ADMIN) {
      return medicalCenters?.active?.centerName ? (
        getInitials()
      ) : (
        <HomeOutlined />
      );
    } else {
      return getInitials();
    }
  };
  return (
    <div className="inline-flex gap-8 items-center">
      <Avatar
        {...props}
        style={
          style || {
            verticalAlign: 'middle',
            color: '#241773',
            backgroundColor: '#E9F1FA',
            border: 'solid #241773 1px',
            padding: '20px',
            fontSize: '1.6rem',
            fontWeight: '800',
          }
        }
        size={size || 'large'}
        icon={getIon()}
      />
      <Fragment>
        {medicalCenters?.list != null &&
        Object.keys(medicalCenters?.list).length > 0 ? (
          <Select
            options={Object.values(medicalCenters.list).map((o) => ({
              label: o.centerName,
              value: String(o.id),
            }))}
            value={
              medicalCenters?.active?.id != null
                ? String(medicalCenters?.active?.id)
                : undefined
            }
            onChange={(val) => {
              if (val != null) {
                disptach(centerActions.setActiveMedicalCenter(val));
              }
            }}
          />
        ) : (
          <Fragment>
            {fullname && (
              <span
                style={{
                  maxWidth: 140,
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  color: '#241773',
                }}
              >
                {fullName}
              </span>
            )}
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

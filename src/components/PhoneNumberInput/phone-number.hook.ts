import { useState } from 'react';
import { Country } from '../../@types';
import { usePlaces } from '../../hooks/common.hooks';
import { PhoneMasks, defaultPhonemask } from '../../constants';
import { NumberFormat } from '../../utils/StringFormatter';

export const usePhoneNumberInput = (countryBounds?: string[]) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [formatter, setFormatter] = useState(
    new NumberFormat(PhoneMasks.us.mask, PhoneMasks.us.dial),
  );
  const { countries } = usePlaces(countryBounds);

  const handleCountryChange = (value: string) => {
    if (countries) {
      const country = countries[value];
      setSelectedCountry(country || null);
      const mask =
        PhoneMasks[String(country?.iso2Code) as keyof typeof PhoneMasks];
      const maskUsed = mask ?? defaultPhonemask(country?.dial);
      setFormatter(
        new NumberFormat(maskUsed.mask, maskUsed.dial, '#', mask == null),
      );
    }
  };

  return {
    countries: countries ? Object.values(countries) : [],
    selectedCountry,
    formatter,
    handleCountryChange,
  };
};

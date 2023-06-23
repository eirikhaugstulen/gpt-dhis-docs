import React from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';


type Option = {
  id: string;
  displayName: string;
  disabled?: boolean;
};

type ListboxProps = {
  options: Option[];
  value: Option;
  onChange: (value: Option) => void;
};

export const SelectField: React.FC<ListboxProps> = ({ options, value, onChange }) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative mt-1">
        <Listbox.Button className="relative mt-2 w-full cursor-pointer border bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-sky-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-300 sm:text-sm">
          <span className="block truncate">{value?.displayName}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {options?.map((option) => (
            <Listbox.Option
              key={option.id}
              disabled={option.disabled}
              className={({ active, disabled }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? 'bg-sky-100 text-sky-900' : disabled ? 'bg-gray-100 text-gray-500' : 'text-gray-900'
                }`
              }
              value={option}
            >
              {option.displayName}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};
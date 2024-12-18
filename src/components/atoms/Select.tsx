import React from 'react';
import { 
  Listbox, 
  ListboxButton, 
  ListboxOption, 
  ListboxOptions, 
  ListboxLabel, 
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { classNames } from "@headlessui/react/dist/utils/class-names";

export interface Option {
  id: string;
  name: string;
}

interface SelectProps {
  headerLabel: string;
  options: Option[];
  value: Option | null;
  onChange: (value: Option) => void;
  className?: string;
}

const Select: React.FC<SelectProps> = ({headerLabel, options, value, onChange, className }) => (
  <div className={className}>
    <Listbox value={value} onChange={onChange}>
      <ListboxLabel className="block text-sm font-medium text-gray-700 mb-1">{headerLabel}</ListboxLabel>
      <div className="relative mt-1">
        <ListboxButton
          className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
        >
          <span className="flex items-center">
            <span className="ml-3 block truncate">
              {value ? value.name : 'Select an action'}
            </span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
        </ListboxButton>
        <ListboxOptions
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-3 pr-9 ${
                  active ? 'text-neutral-strongest bg-indigo-600' : 'text-gray-900'
                }`
              }
            >
              {({ selected, active }) => (
                <>
                  <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                    {option.name}
                  </span>
                  {selected ? (
                    <span
                      className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                        active ? 'text-white' : 'text-indigo-600'
                      }`}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  </div>
);

export default Select;
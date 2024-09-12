'use client';
import { Header } from '@/shared/ui/Header';
import { useState } from 'react';

interface IUserSettingsWithText {
  label: string;
  value: string;
  type: 'text';
}

interface IUserSettingsWithToggle {
  label: string;
  value: boolean;
  type: 'toggle';
}

type IUserSettings = IUserSettingsWithText | IUserSettingsWithToggle;

const mockSettings: IUserSettings[] = [
  { label: 'Username', value: 'Tolik Fe', type: 'text' },
  { label: 'Email', value: 'tolik@fe.com', type: 'text' },
  { label: 'Notification', value: true, type: 'toggle' },
  { label: 'Dark mode', value: false, type: 'toggle' },
  { label: 'Language', value: 'English', type: 'text' },
];

const Settings = () => {
  const [userSettings, setUserSettings] =
    useState<IUserSettings[]>(mockSettings);

  const handleToggleChange = (index: number) => {
    const settingsCopy = [...userSettings];
    if (settingsCopy[index].type === 'toggle') {
      settingsCopy[index].value = !settingsCopy[index].value;
    }
    setUserSettings(settingsCopy);
  };

  return (
    <div className="w-full">
      <Header name="User Settings" />
      <div className="overflow-x-auto mt-5 shadow-md">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Setting
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, idx) => (
              <tr className="hover:bg-blue-50" key={setting.label}>
                <td className="py-2 px-4">{setting.label}</td>
                <td className="py-2 px-4">
                  {setting.type === 'toggle' ? (
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.value}
                        onChange={() => handleToggleChange(idx)}
                      />
                      <div
                        className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4
                            transition peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                            after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                            peer-checked:bg-blue-600"
                      />
                    </label>
                  ) : (
                    <input
                      type="text"
                      className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
                      value={setting.value}
                      onChange={(e) => {
                        const settingsCopy = [...userSettings];
                        settingsCopy[idx].value = e.target.value;
                        setUserSettings(settingsCopy);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function getTime(date: string) {
  return new Date(date).getTime();
}
export default function DateFilter({ column: { setFilter } }) {
  const [startDate, setStateDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div className="flex items-center ">
      <div>
        <DatePicker
          selected={startDate}
          className="bg-gray-100 rounded focus:outline-none focus:ring-2 focus:border-indigo-300 w-20 px-0.5 py-1"
          maxDate={endDate}
          onChange={(date) => {
            setStateDate(date);
            setFilter((prev) => [
              getTime(date),
              prev?.[1] || endDate.getTime(),
            ]);
          }}
        />
      </div>
      <span className="font-medium text-xs mx-1">To</span>
      <div>
        <DatePicker
          selected={endDate}
          minDate={startDate}
          className="bg-gray-100 rounded focus:outline-none focus:ring-2 focus:border-indigo-300 w-20 px-0.5 py-1"
          onChange={(date) => {
            setEndDate(date);
            setFilter((prev) => [prev?.[0], getTime(date)]);
          }}
        />
      </div>
    </div>
  );
}

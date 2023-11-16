import React, { useState } from 'react';
import Select from 'react-select';
import { teacher_names } from './teachers';
import './search.css';

const SearchableTeacherSelect = ({ onTeacherSelect, ...props }) => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (inputValue) => {
    setSearchInput(inputValue);
  };

  
  const handleSelectChange = (selectedTeacher) => {
    setSelectedTeacher(selectedTeacher);
    if (onTeacherSelect) {
      onTeacherSelect(selectedTeacher.value);
    }
    setSearchInput('');
    setIsDropdownOpen(false);
  };

  const handleTeacherSelectClick = () => {
    const currentlySelectedTeacher = selectedTeacher;
  
    if (currentlySelectedTeacher) {
      setSelectedTeacher(null);
    } else {
      setIsDropdownOpen(true);
    }
  };

  const filteredTeachers = teacher_names
    .filter((teacher) =>
      teacher.toLowerCase().includes(searchInput.toLowerCase())
    )
    .map((teacher) => ({ value: teacher, label: teacher }));

  return (
    <div className="searchable-teacher-select-container" onSelect={handleTeacherSelectClick}>
      <div className={`searchable-teacher-select-wrapper ${isDropdownOpen ? 'is-open' : ''}`}>
        <div className="title">Search for a teacher...</div>
        <div className="select-container">
          <Select
            className="select"
            value={selectedTeacher}
            onChange={handleSelectChange}
            onInputChange={handleInputChange}
            options={filteredTeachers}
            isSearchable
            placeholder="Search for a teacher..."
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchableTeacherSelect;

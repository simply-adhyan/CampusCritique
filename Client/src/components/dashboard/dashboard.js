import React, { useState } from 'react';
import FeedbackForm from '../Feedback/FeedbackForm';
import './dash.css';
import SearchableTeacherSelect from '../../function/searchableselect';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate= useNavigate();
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState('');
  
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleCheckboxChange = () => {
    setAgreeToTerms(!agreeToTerms);
  };

  const handleTeacherSelect = (teacherName) => {
    setSelectedTeacher(teacherName);
    setShowFeedbackForm(false);
    setSemester('');
    setSection('');
    setAgreeToTerms(false);
    setShowError(false);
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSection(e.target.value);

  };
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
    
  };

  const handleSubmitFeedback = () => {
    if (!agreeToTerms) {
      setShowError(true);
      return;
    }

    if (!semester || !section) {
      setShowError(true);
      return;
    }
    console.log('cse-'+section,semester,selectedTeacher)
    navigate("/dashboard/feedback")
  };

  return (
    <div className="dashboard">
      <h1>Teacher Dashboard</h1>
      <SearchableTeacherSelect onTeacherSelect={handleTeacherSelect} />

      {selectedTeacher && (
        <div className="teacher-feedback">
          <label>In which semester did you study under the instruction of {selectedTeacher}?</label>
          <select value={semester} onChange={handleSemesterChange} required>
            <option value="">Select Semester</option>
            <option value="1">1st Semester</option>
            <option value="2">2nd Semester</option>
            <option value="3">3rd Semester</option>
            <option value="4">4th Semester</option>
            <option value="5">5th Semester</option>
            <option value="6">6th Semester</option>
            <option value="7">7th Semester</option>
            <option value="8">8th Semester</option>
          </select>

          <label>In which section were you taught by {selectedTeacher}?</label>
          <input type="number" min={0} max={100} placeholder="For e.g. CSE-1" value={section} onChange={handleSectionChange} required />
          <label>Which subject were you taught by {selectedTeacher}?</label>
          <input type="text" placeholder="For e.g. AI,BD etc" value={subject} onChange={handleSubjectChange} required />
          
          <div className="checkbox-label">
            <label>
              <input
                className="feedback-checkbox"
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={agreeToTerms}
              />
              I agree that I am not lying about the information I have provided.
            </label>
          </div>

          {showError && <p className="error-message">Please fill in all required fields.</p>}

          <button onClick={handleSubmitFeedback}>Submit Feedback</button>
        </div>
      )}

      {showFeedbackForm && (
        <FeedbackForm onClose={() => setShowFeedbackForm(false)} />
      )}
    </div>
  );
};

export default Dashboard;


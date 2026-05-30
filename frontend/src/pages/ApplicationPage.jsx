import { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ApplicationPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    skills: '',
    years_of_experience: '',
    linkedin_url: '',
    github_url: ''
  });
  const [resume, setResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    
    if (resume) {
      data.append('resume', resume);
    }

    try {
      // Point this to your backend running on port 5000
      const response = await fetch('http://localhost:5000/api/apply', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '', phone: '', email: '', skills: '', years_of_experience: '', linkedin_url: '', github_url: ''
        });
        setResume(null);
        if(fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to submit application.');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
      setErrorMessage('Network error. Please ensure the backend server is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-6">
      <div className="max-w-3xl w-full glass-card p-8 md:p-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-3">Join <span className="text-cyber-blue">Aiotics</span></h1>
          <p className="text-gray-400">Fill out the form below to apply. We're excited to see what you can build.</p>
        </div>

        {submitStatus === 'success' && (
          <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3 text-green-400">
            <CheckCircle2 className="w-5 h-5" />
            <p>Application submitted successfully! We will be in touch soon.</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" placeholder="John Doe" />
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Address *</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="john@example.com" />
            </div>
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number *</label>
              <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-field" placeholder="+1 (555) 000-0000" />
            </div>
            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Years of Experience *</label>
              <input required type="number" min="0" name="years_of_experience" value={formData.years_of_experience} onChange={handleChange} className="input-field" placeholder="e.g. 3" />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Skills (comma separated) *</label>
            <input required type="text" name="skills" value={formData.skills} onChange={handleChange} className="input-field" placeholder="React, Node.js, Python, IoT Protocols" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">LinkedIn Profile URL</label>
              <input type="url" name="linkedin_url" value={formData.linkedin_url} onChange={handleChange} className="input-field" placeholder="https://linkedin.com/in/..." />
            </div>
            {/* GitHub */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">GitHub Handle URL</label>
              <input type="url" name="github_url" value={formData.github_url} onChange={handleChange} className="input-field" placeholder="https://github.com/..." />
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Resume Upload *</label>
            <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-cyber-blue/50 transition-colors relative">
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                accept=".pdf,.doc,.docx"
                required
              />
              <UploadCloud className="w-10 h-10 text-gray-500 mx-auto mb-3" />
              {resume ? (
                <p className="text-cyber-blue font-medium">{resume.name}</p>
              ) : (
                <>
                  <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PDF, DOC, or DOCX (MAX. 5MB)</p>
                </>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn-primary w-full flex justify-center items-center py-4 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}

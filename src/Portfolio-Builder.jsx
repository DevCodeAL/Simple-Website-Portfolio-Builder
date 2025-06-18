import React, { useState, useRef } from 'react';
import { Plus, Trash2, Eye, Download, User, Briefcase, Link2, Mail, Github, Linkedin, Twitter, Globe, ArrowLeft, ArrowRight } from 'lucide-react';

const PortfolioBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const fileInputRef = useRef(null);

  const [portfolioData, setPortfolioData] = useState({
    name: '',
    title: '',
    bio: '',
    profileImage: '',
    projects: [
      {
        id: 1,
        title: '',
        description: '',
        image: '',
        liveLink: '',
        githubLink: ''
      }
    ],
    contacts: {
      email: '',
      phone: '',
      website: '',
      github: '',
      linkedin: '',
      twitter: ''
    }
  });

  const steps = [
    { id: 0, title: 'Personal Info', icon: User },
    { id: 1, title: 'Projects', icon: Briefcase },
    { id: 2, title: 'Contact & Social', icon: Link2 }
  ];

  const updateBasicInfo = (field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e, type, projectId = null) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'profile') {
          updateBasicInfo('profileImage', e.target.result);
        } else if (type === 'project') {
          updateProject(projectId, 'image', e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: '',
      description: '',
      image: '',
      liveLink: '',
      githubLink: ''
    };
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const removeProject = (id) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }));
  };

  const updateProject = (id, field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      )
    }));
  };

  const updateContact = (field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      contacts: { ...prev.contacts, [field]: value }
    }));
  };

  const generateHTML = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${portfolioData.name} - Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="gradient-bg text-white py-20">
        <div class="container mx-auto px-6 text-center">
            ${portfolioData.profileImage ? `<img src="${portfolioData.profileImage}" alt="${portfolioData.name}" class="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-lg object-cover">` : ''}
            <h1 class="text-4xl md:text-6xl font-bold mb-4">${portfolioData.name}</h1>
            <p class="text-xl md:text-2xl mb-6 opacity-90">${portfolioData.title}</p>
            <p class="text-lg max-w-2xl mx-auto opacity-80">${portfolioData.bio}</p>
        </div>
    </header>

    <!-- Projects Section -->
    <section class="py-20">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">My Projects</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${portfolioData.projects.map(project => `
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                        ${project.image ? `<img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">` : '<div class="w-full h-48 bg-gray-200 flex items-center justify-center"><span class="text-gray-500">No Image</span></div>'}
                        <div class="p-6">
                            <h3 class="text-xl font-bold mb-3 text-gray-800">${project.title}</h3>
                            <p class="text-gray-600 mb-4">${project.description}</p>
                            <div class="flex space-x-4">
                                ${project.liveLink ? `<a href="${project.liveLink}" target="_blank" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Live Demo</a>` : ''}
                                ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors">GitHub</a>` : ''}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="bg-gray-800 text-white py-20">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-16">Get In Touch</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                ${portfolioData.contacts.email ? `
                    <a href="mailto:${portfolioData.contacts.email}" class="bg-gray-700 p-6 rounded-xl hover:bg-gray-600 transition-colors">
                        <div class="text-2xl mb-2">📧</div>
                        <p class="font-semibold">Email</p>
                        <p class="text-gray-300">${portfolioData.contacts.email}</p>
                    </a>
                ` : ''}
                ${portfolioData.contacts.phone ? `
                    <a href="tel:${portfolioData.contacts.phone}" class="bg-gray-700 p-6 rounded-xl hover:bg-gray-600 transition-colors">
                        <div class="text-2xl mb-2">📱</div>
                        <p class="font-semibold">Phone</p>
                        <p class="text-gray-300">${portfolioData.contacts.phone}</p>
                    </a>
                ` : ''}
                ${portfolioData.contacts.website ? `
                    <a href="${portfolioData.contacts.website}" target="_blank" class="bg-gray-700 p-6 rounded-xl hover:bg-gray-600 transition-colors">
                        <div class="text-2xl mb-2">🌐</div>
                        <p class="font-semibold">Website</p>
                        <p class="text-gray-300">${portfolioData.contacts.website}</p>
                    </a>
                ` : ''}
                ${portfolioData.contacts.github ? `
                    <a href="${portfolioData.contacts.github}" target="_blank" class="bg-gray-700 p-6 rounded-xl hover:bg-gray-600 transition-colors">
                        <div class="text-2xl mb-2">⚡</div>
                        <p class="font-semibold">GitHub</p>
                        <p class="text-gray-300">@${portfolioData.contacts.github.split('/').pop()}</p>
                    </a>
                ` : ''}
                ${portfolioData.contacts.linkedin ? `
                    <a href="${portfolioData.contacts.linkedin}" target="_blank" class="bg-gray-700 p-6 rounded-xl hover:bg-gray-600 transition-colors">
                        <div class="text-2xl mb-2">💼</div>
                        <p class="font-semibold">LinkedIn</p>
                        <p class="text-gray-300">Connect with me</p>
                    </a>
                ` : ''}
                ${portfolioData.contacts.twitter ? `
                    <a href="${portfolioData.contacts.twitter}" target="_blank" class="bg-gray-700 p-6 rounded-xl hover:bg-gray-600 transition-colors">
                        <div class="text-2xl mb-2">🐦</div>
                        <p class="font-semibold">Twitter</p>
                        <p class="text-gray-300">@${portfolioData.contacts.twitter.split('/').pop()}</p>
                    </a>
                ` : ''}
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8">
        <div class="container mx-auto px-6 text-center">
            <p>&copy; 2024 ${portfolioData.name}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;
    return html;
  };

  const downloadPortfolio = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${portfolioData.name.replace(/\s+/g, '-').toLowerCase()}-portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
              <div className="flex items-center space-x-4">
                {portfolioData.profileImage && (
                  <img src={portfolioData.profileImage} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload Photo
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'profile')}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={portfolioData.name}
                onChange={(e) => updateBasicInfo('name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
              <input
                type="text"
                value={portfolioData.title}
                onChange={(e) => updateBasicInfo('title', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Full Stack Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={portfolioData.bio}
                onChange={(e) => updateBasicInfo('bio', e.target.value)}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about yourself, your skills, and what you're passionate about..."
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">Projects</h3>
              <button
                onClick={addProject}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            {portfolioData.projects.map((project, index) => (
              <div key={project.id} className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold text-gray-800">Project {index + 1}</h4>
                  {portfolioData.projects.length > 1 && (
                    <button
                      onClick={() => removeProject(project.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="My Awesome Project"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'project', project.id)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of your project..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Live Demo URL</label>
                    <input
                      type="url"
                      value={project.liveLink}
                      onChange={(e) => updateProject(project.id, 'liveLink', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://myproject.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                    <input
                      type="url"
                      value={project.githubLink}
                      onChange={(e) => updateProject(project.id, 'githubLink', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact & Social Media</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={portfolioData.contacts.email}
                  onChange={(e) => updateContact('email', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={portfolioData.contacts.phone}
                  onChange={(e) => updateContact('phone', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
              <input
                type="url"
                value={portfolioData.contacts.website}
                onChange={(e) => updateContact('website', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={portfolioData.contacts.github}
                  onChange={(e) => updateContact('github', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://github.com/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  value={portfolioData.contacts.linkedin}
                  onChange={(e) => updateContact('linkedin', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Twitter URL</label>
              <input
                type="url"
                value={portfolioData.contacts.twitter}
                onChange={(e) => updateContact('twitter', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://twitter.com/username"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderPreview = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Preview Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
          {portfolioData.profileImage && (
            <img 
              src={portfolioData.profileImage} 
              alt={portfolioData.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg object-cover"
            />
          )}
          <h1 className="text-3xl font-bold mb-2">{portfolioData.name || 'Your Name'}</h1>
          <p className="text-lg mb-2 opacity-90">{portfolioData.title || 'Your Title'}</p>
          <p className="opacity-80">{portfolioData.bio || 'Your bio will appear here...'}</p>
        </div>

        {/* Preview Projects */}
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Projects</h2>
          <div className="grid gap-4">
            {portfolioData.projects.map((project, index) => (
              <div key={project.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  {project.image && (
                    <img src={project.image} alt={project.title} className="w-16 h-16 rounded object-cover flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{project.title || `Project ${index + 1}`}</h3>
                    <p className="text-gray-600 text-sm mb-2">{project.description || 'Project description...'}</p>
                    <div className="flex space-x-2">
                      {project.liveLink && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Live Demo</span>
                      )}
                      {project.githubLink && (
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">GitHub</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Contact */}
        <div className="bg-gray-800 text-white p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Contact</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {portfolioData.contacts.email && (
              <div>📧 {portfolioData.contacts.email}</div>
            )}
            {portfolioData.contacts.phone && (
              <div>📱 {portfolioData.contacts.phone}</div>
            )}
            {portfolioData.contacts.website && (
              <div>🌐 Website</div>
            )}
            {portfolioData.contacts.github && (
              <div>⚡ GitHub</div>
            )}
            {portfolioData.contacts.linkedin && (
              <div>💼 LinkedIn</div>
            )}
            {portfolioData.contacts.twitter && (
              <div>🐦 Twitter</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (previewMode) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setPreviewMode(false)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Editor</span>
                </button>
                <h1 className="text-xl font-bold text-gray-800">Portfolio Preview</h1>
              </div>
              <button
                onClick={downloadPortfolio}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download HTML</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6">
          <div dangerouslySetInnerHTML={{ __html: generateHTML() }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
         <div>
           <h1 className="text-2xl font-bold p-1 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
           <span>{`</>`} DevCode</span>
        </h1>
      </div>
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-800">Portfolio Builder</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setPreviewMode(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button
                onClick={downloadPortfolio}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Step Navigation */}
            <div className="flex justify-between items-center mb-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => setCurrentStep(step.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        currentStep === step.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{step.title}</span>
                    </button>
                    {index < steps.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-gray-400 mx-2" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Form Content */}
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="flex items-center space-x-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              
              <button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === steps.length - 1}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Live Preview</h2>
              <div className="text-sm text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden" style={{ height: '600px', overflowY: 'auto' }}>
              {renderPreview()}
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full bg-gray-900 text-gray-400 py-4 flex justify-center">
      <p className="text-center text-sm">
        © 2025 Developed by <span className="text-[#1ed760] font-semibold">Leomar Abad</span>
      </p>
    </footer>
    </div>
  );
};

export default PortfolioBuilder;
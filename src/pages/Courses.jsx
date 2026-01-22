import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Plus, Check, Trash2, Search, Calendar, Filter, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/toast-notification';

const categories = [
  'Accounting',
  'Finance',
  'Marketing',
  'Management',
  'Business Analytics',
  'Economics',
  'MIS / IS',
  'HR',
  'Supply Chain',
  'Entrepreneurship',
  'Statistics',
  'Computer Science',
  'Other / Electives'
];

const mockCourseCatalog = [
  { id: 1, code: 'ACC 2010', name: 'Intermediate Accounting I', description: 'In-depth study of financial accounting concepts and principles', category: 'Accounting', level: '2000', credits: 3, delivery: 'In-person' },
  { id: 2, code: 'ACC 2020', name: 'Intermediate Accounting II', description: 'Advanced financial accounting topics including consolidations', category: 'Accounting', level: '2000', credits: 3, delivery: 'In-person' },
  { id: 3, code: 'ACC 3030', name: 'Cost Accounting', description: 'Management accounting for planning, control, and decision-making', category: 'Accounting', level: '3000', credits: 3, delivery: 'Hybrid' },
  { id: 4, code: 'FIN 3010', name: 'Corporate Finance', description: 'Financial decision-making in corporations including capital budgeting', category: 'Finance', level: '3000', credits: 3, delivery: 'In-person' },
  { id: 5, code: 'FIN 4020', name: 'Investment Analysis', description: 'Security analysis, portfolio management, and investment strategies', category: 'Finance', level: '4000', credits: 3, delivery: 'Online' },
  { id: 6, code: 'MKT 2010', name: 'Principles of Marketing', description: 'Introduction to marketing concepts, consumer behavior, and strategy', category: 'Marketing', level: '2000', credits: 3, delivery: 'In-person' },
  { id: 7, code: 'MKT 3020', name: 'Digital Marketing', description: 'Social media, SEO, content marketing, and digital analytics', category: 'Marketing', level: '3000', credits: 3, delivery: 'Online' },
  { id: 8, code: 'MGT 3010', name: 'Organizational Behavior', description: 'Human behavior in organizations, leadership, and motivation', category: 'Management', level: '3000', credits: 3, delivery: 'In-person' },
  { id: 9, code: 'MGT 4030', name: 'Strategic Management', description: 'Corporate strategy formulation and competitive analysis', category: 'Management', level: '4000', credits: 3, delivery: 'Hybrid' },
  { id: 10, code: 'BA 3010', name: 'Business Analytics', description: 'Data analysis, visualization, and business intelligence tools', category: 'Business Analytics', level: '3000', credits: 3, delivery: 'Online' },
  { id: 11, code: 'BA 4020', name: 'Predictive Analytics', description: 'Machine learning and predictive modeling for business', category: 'Business Analytics', level: '4000', credits: 3, delivery: 'Online' },
  { id: 12, code: 'ECON 1010', name: 'Microeconomics', description: 'Supply and demand, market structures, consumer theory', category: 'Economics', level: '1000', credits: 3, delivery: 'In-person' },
  { id: 13, code: 'ECON 1020', name: 'Macroeconomics', description: 'National income, inflation, unemployment, monetary policy', category: 'Economics', level: '1000', credits: 3, delivery: 'In-person' },
  { id: 14, code: 'MIS 2010', name: 'Management Information Systems', description: 'Introduction to business information systems and technology', category: 'MIS / IS', level: '2000', credits: 3, delivery: 'Hybrid' },
  { id: 15, code: 'MIS 3020', name: 'Database Management', description: 'Database design, SQL, and data management practices', category: 'MIS / IS', level: '3000', credits: 3, delivery: 'In-person' },
  { id: 16, code: 'HR 3010', name: 'Human Resource Management', description: 'Recruitment, training, compensation, and employee relations', category: 'HR', level: '3000', credits: 3, delivery: 'In-person' },
  { id: 17, code: 'SCM 3010', name: 'Supply Chain Management', description: 'Logistics, procurement, inventory management, and operations', category: 'Supply Chain', level: '3000', credits: 3, delivery: 'Hybrid' },
  { id: 18, code: 'ENT 3010', name: 'Entrepreneurship', description: 'Starting and managing new ventures, business planning', category: 'Entrepreneurship', level: '3000', credits: 3, delivery: 'In-person' },
  { id: 19, code: 'STAT 2010', name: 'Business Statistics', description: 'Descriptive statistics, probability, hypothesis testing', category: 'Statistics', level: '2000', credits: 3, delivery: 'In-person' },
  { id: 20, code: 'CS 1010', name: 'Introduction to Programming', description: 'Basic programming concepts using Python', category: 'Computer Science', level: '1000', credits: 3, delivery: 'Online' }
];

const terms = ['Winter 2026', 'Fall 2025', 'Summer 2026', 'Fall 2026'];
const levels = ['All Levels', '1000', '2000', '3000', '4000'];
const deliveryModes = ['All Modes', 'In-person', 'Online', 'Hybrid'];

export default function Courses() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All Majors');
  const [selectedTerm, setSelectedTerm] = useState('Winter 2026');
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('All Levels');
  const [deliveryFilter, setDeliveryFilter] = useState('All Modes');
  const [myCourses, setMyCourses] = useState([]);

  const mockUser = {
    full_name: 'Alex Johnson',
    email: 'alex.johnson@university.edu'
  };

  const filteredCatalog = mockCourseCatalog.filter(course => {
    const matchesCategory = selectedCategory === 'All Majors' || course.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === 'All Levels' || course.level === levelFilter;
    const matchesDelivery = deliveryFilter === 'All Modes' || course.delivery === deliveryFilter;
    
    return matchesCategory && matchesSearch && matchesLevel && matchesDelivery;
  });

  const handleAddCourse = (course) => {
    if (!myCourses.find(c => c.id === course.id)) {
      setMyCourses([...myCourses, { ...course, status: 'active' }]);
    }
  };

  const handleRemoveCourse = (courseId) => {
    setMyCourses(myCourses.filter(c => c.id !== courseId));
  };

  const isCourseAdded = (courseId) => {
    return myCourses.some(c => c.id === courseId);
  };

  const handleContinue = () => {
    toast.success('Success', 'Courses added successfully');
    setTimeout(() => {
      navigate(createPageUrl('Dashboard'));
    }, 800);
  };

  return (
    <AppLayout user={mockUser} title="Add Your Courses" breadcrumb="Dashboard / Courses">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 flex items-start justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Your Courses</h2>
            <p className="text-gray-500 text-sm">
              Choose courses from QBtron's catalog to build your schedule. You can add or remove courses anytime.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate(createPageUrl('UploadSyllabus'))}
              className="bg-[#2d6a4f] hover:bg-[#1b4332] text-white px-6 py-2.5 h-auto text-sm font-medium shadow-sm hover:shadow-md transition-all"
            >
              <Upload className="w-4 h-4 mr-2.5" />
              Add Courses
            </Button>
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="bg-transparent border-0 text-sm text-gray-700 focus:outline-none focus:ring-0"
              >
                {terms.map((term) => (
                  <option key={term} value={term}>{term}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Section A: Course Catalog */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Search + Filters */}
            <div className="bg-white rounded-xl border border-gray-100/50 p-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none sm:w-48"
                >
                  <option value="All Majors">All Majors</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search course code or name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9 text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  <select
                    value={deliveryFilter}
                    onChange={(e) => setDeliveryFilter(e.target.value)}
                    className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none"
                  >
                    {deliveryModes.map(mode => (
                      <option key={mode} value={mode}>{mode}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Course List */}
            <div className="bg-white rounded-xl border border-gray-100/50">
              <div className="px-4 py-3 border-b border-gray-50">
                <h3 className="text-sm font-semibold text-gray-700">
                  {selectedCategory === 'All Majors' ? 'Course Catalog' : `${selectedCategory} Courses`}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{filteredCatalog.length} courses available</p>
              </div>
              <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
                {filteredCatalog.length > 0 ? (
                  filteredCatalog.map((course) => (
                    <div key={course.id} className="px-4 py-3 hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-semibold text-gray-900">{course.code}</h4>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-sm text-gray-700">{course.name}</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-2">{course.description}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-400">
                            <span>{course.credits} credits</span>
                            <span>•</span>
                            <span>Level {course.level}</span>
                            <span>•</span>
                            <span>{course.delivery}</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => isCourseAdded(course.id) ? null : handleAddCourse(course)}
                          size="sm"
                          disabled={isCourseAdded(course.id)}
                          className={cn(
                            "h-8 text-xs flex-shrink-0",
                            isCourseAdded(course.id)
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 cursor-default"
                              : "bg-[#2d6a4f] hover:bg-[#1b4332]"
                          )}
                        >
                          {isCourseAdded(course.id) ? (
                            <>
                              <Check className="w-3 h-3 mr-1" />
                              Added
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3 mr-1" />
                              Add
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-12 text-center">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">No courses found matching your filters</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Section B: My Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl border border-gray-100/50 sticky top-6">
              <div className="px-4 py-3 border-b border-gray-50">
                <h3 className="text-sm font-semibold text-gray-700">My Courses — {selectedTerm}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{myCourses.length} course{myCourses.length !== 1 ? 's' : ''} selected</p>
              </div>

              <div className="max-h-[500px] overflow-y-auto">
                {myCourses.length > 0 ? (
                  <div className="divide-y divide-gray-50">
                    {myCourses.map((course) => (
                      <div key={course.id} className="px-4 py-3 hover:bg-gray-50/50 transition-colors">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-gray-900">{course.code}</h4>
                            <p className="text-xs text-gray-600 truncate">{course.name}</p>
                            <div className="mt-1 inline-block">
                              <span className="text-xs bg-[#2d6a4f]/10 text-[#2d6a4f] px-2 py-0.5 rounded">
                                Active
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveCourse(course.id)}
                            className="text-gray-400 hover:text-rose-500 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-12 text-center">
                    <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-xs text-gray-500 mb-1">No courses selected yet</p>
                    <p className="text-xs text-gray-400">Choose from the catalog to get started</p>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-50">
                <Button
                  onClick={handleContinue}
                  disabled={myCourses.length === 0}
                  className="w-full bg-[#2d6a4f] hover:bg-[#1b4332] mb-2"
                >
                  Continue to Dashboard
                </Button>
                <Button
                  onClick={() => navigate(createPageUrl('Dashboard'))}
                  variant="ghost"
                  className="w-full text-xs text-gray-500"
                >
                  Skip for now
                </Button>
                <p className="text-xs text-gray-400 text-center mt-3">
                  You can change these later in Courses
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
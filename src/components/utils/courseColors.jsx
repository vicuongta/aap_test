// QBtron Course Color Palette
// NO red, yellow, or green (reserved for priority indicators)
// Muted, professional colors that work with white and #f6f8f6 backgrounds

export const COURSE_COLORS = {
  slate: {
    name: 'Slate',
    bg: '#f1f5f9',
    text: '#475569',
    border: '#cbd5e1',
    accent: '#64748b'
  },
  indigo: {
    name: 'Indigo',
    bg: '#e0e7ff',
    text: '#4338ca',
    border: '#c7d2fe',
    accent: '#6366f1'
  },
  blue: {
    name: 'Blue',
    bg: '#dbeafe',
    text: '#1e40af',
    border: '#bfdbfe',
    accent: '#3b82f6'
  },
  sky: {
    name: 'Sky',
    bg: '#e0f2fe',
    text: '#0369a1',
    border: '#bae6fd',
    accent: '#0ea5e9'
  },
  cyan: {
    name: 'Cyan',
    bg: '#cffafe',
    text: '#0e7490',
    border: '#a5f3fc',
    accent: '#06b6d4'
  },
  teal: {
    name: 'Teal',
    bg: '#ccfbf1',
    text: '#115e59',
    border: '#99f6e4',
    accent: '#14b8a6'
  },
  purple: {
    name: 'Purple',
    bg: '#f3e8ff',
    text: '#6b21a8',
    border: '#e9d5ff',
    accent: '#9333ea'
  },
  magenta: {
    name: 'Magenta',
    bg: '#fce7f3',
    text: '#be185d',
    border: '#fbcfe8',
    accent: '#ec4899'
  },
  orchid: {
    name: 'Orchid',
    bg: '#fae8ff',
    text: '#a21caf',
    border: '#f5d0fe',
    accent: '#d946ef'
  },
  brown: {
    name: 'Brown',
    bg: '#fed7aa',
    text: '#92400e',
    border: '#fdba74',
    accent: '#b45309'
  },
  copper: {
    name: 'Copper',
    bg: '#ffe4e6',
    text: '#881337',
    border: '#fecdd3',
    accent: '#be123c'
  },
  charcoal: {
    name: 'Charcoal',
    bg: '#e5e7eb',
    text: '#1f2937',
    border: '#d1d5db',
    accent: '#374151'
  }
};

// Get array of color keys for auto-assignment
export const COLOR_KEYS = Object.keys(COURSE_COLORS);

// Get a course color object by key
export const getCourseColor = (colorKey) => {
  return COURSE_COLORS[colorKey] || COURSE_COLORS.slate;
};

// Get course color by course code (looks up from mock data)
const courseColorMap = {
  'CS301': 'indigo',
  'MATH201': 'blue',
  'ENG102': 'purple',
  'PSYCH101': 'magenta',
  'CHEM101': 'cyan',
  'CS101': 'sky',
  'MATH101': 'teal',
  'COMP301': 'orchid'
};

export const getCourseColorByCode = (courseCode) => {
  const colorKey = courseColorMap[courseCode] || 'slate';
  return getCourseColor(colorKey);
};

// Auto-assign next available color (cycles through palette)
export const getNextAvailableColor = (usedColors = []) => {
  const availableColors = COLOR_KEYS.filter(key => !usedColors.includes(key));
  if (availableColors.length > 0) {
    return availableColors[0];
  }
  // If all colors used, cycle back
  return COLOR_KEYS[usedColors.length % COLOR_KEYS.length];
};

// Get color styles for a course
export const getCourseColorStyles = (colorKey) => {
  const color = getCourseColor(colorKey);
  return {
    backgroundColor: color.bg,
    color: color.text,
    borderColor: color.border
  };
};

// Get dot/badge color for course indicators
export const getCourseDotColor = (colorKey) => {
  const color = getCourseColor(colorKey);
  return color.accent;
};
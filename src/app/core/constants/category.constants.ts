import { CategoryType } from '@app/core/models/category.model';

export const AVAILABLE_COLORS = [
  { name: 'Green', color: '#277C78' },
  { name: 'Yellow', color: '#F2CDAC' },
  { name: 'Cyan', color: '#82C9D7' },
  { name: 'Navy', color: '#626070' },
  { name: 'Red', color: '#C94736' },
  { name: 'Purple', color: '#826CB0' },
  { name: 'Turquoise', color: '#597C7C' },
  { name: 'Brown', color: '#93674F' },
  { name: 'Magenta', color: '#934F6F' },
  { name: 'Blue', color: '#3F82B2' },
  { name: 'Navy Grey', color: '#97A0AC' },
  { name: 'Army Green', color: '#7F9161' },
  { name: 'Gold', color: '#CAB361' },
  { name: 'Orange', color: '#BE6C49' },
  { name: 'Pink', color: '#AF81BA' },
  { name: 'Light Blue', color: '#5DB7DE' },
  { name: 'Teal', color: '#1E90FF' },
  { name: 'Lime', color: '#32CD32' },
  { name: 'Coral', color: '#FF7F50' },
  { name: 'Indigo', color: '#4B0082' },
  { name: 'Slate', color: '#475569' },
  { name: 'Emerald', color: '#10B981' },
  { name: 'Violet', color: '#8B5CF6' },
  { name: 'Amber', color: '#F59E0B' },
  { name: 'Rose', color: '#F43F5E' },
  { name: 'Sky', color: '#0EA5E9' },
];

export const INITIAL_CATEGORY_FORM_DATA = {
  name: '',
  type: 'OUTCOME' as CategoryType,
  color: '#277C78',
};

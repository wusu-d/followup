import EmotionalWellnessIcon from '@/components/icons/EmotionalWellnessIcon';
import EnviromentalWellnessIcon from '@/components/icons/EnviromentalWellnessIcon';
import FinancialWellnessIcon from '@/components/icons/FinancialWellnessIcon';
import IntellectualWellnessIcon from '@/components/icons/IntellectualWellnessIcon';
import PhysicalWellnessIcon from '@/components/icons/PhysicalWellnessIcon';
import SocialWellnessIcon from '@/components/icons/SocialWellnessIcon';
import SpiritualWellnessIcon from '@/components/icons/SpiritualWellnessIcon';
import VocationalWellnessIcon from '@/components/icons/VocationalWellnessIcon';

interface WellnessInfo {
  icon: React.ComponentType;
  color: string;
  href: string;
}

type CategoryMap = Record<string, WellnessInfo>;

export const categoriesMapping: CategoryMap = {
  'Emotional Wellness': {
    icon: EmotionalWellnessIcon,
    color: '#16C098',
    href: 'emotional',
  },
  'Environmental Wellness': {
    icon: EnviromentalWellnessIcon,
    color: '#EFA065',
    href: 'enviromental',
  },
  'Social Wellness': {
    icon: SocialWellnessIcon,
    color: '#3870DF',
    href: 'social',
  },
  'Financial Wellness': {
    icon: FinancialWellnessIcon,
    color: '#152F48',
    href: 'financial',
  },
  'Intellectual Wellness': {
    icon: IntellectualWellnessIcon,
    color: '#67DD81',
    href: 'intellectual',
  },
  'Vocational Wellness': {
    icon: VocationalWellnessIcon,
    color: '#785DED',
    href: 'vocational',
  },
  'Physical Wellness': {
    icon: PhysicalWellnessIcon,
    color: '#ED605D',
    href: 'physical',
  },
  'Spiritual Wellness': {
    icon: SpiritualWellnessIcon,
    color: '#F4959E',
    href: 'spiritual',
  },
};

export const specialistCategories = [
  {
    id: 1,
    icon: EmotionalWellnessIcon,
    title: 'Emotional Wellness',
    color: '#16C098',
    href: 'emotional',
  },
  {
    id: 2,
    title: 'Financial Wellness',
    icon: FinancialWellnessIcon,
    color: '#152F48',
    href: 'financial',
  },
  {
    id: 3,
    title: 'Environmental Wellness',
    icon: EnviromentalWellnessIcon,
    color: '#EFA065',
    href: 'enviromental',
  },
  {
    id: 4,
    title: 'Intellectual Wellness',
    icon: IntellectualWellnessIcon,
    color: '#67DD81',
    href: 'intellectual',
  },
  {
    id: 5,
    icon: PhysicalWellnessIcon,
    title: 'Physical Wellness',
    color: '#ED605D',
    href: 'physical',
  },
  {
    id: 6,
    title: 'Social Wellness',
    icon: SocialWellnessIcon,
    color: '#3870DF',
    href: 'social',
  },
  {
    id: 7,
    title: 'Spiritual Wellness',
    icon: SpiritualWellnessIcon,
    color: '#F4959E',
    href: 'spiritual',
  },
  {
    id: 8,
    title: 'Vocational Wellness',
    icon: VocationalWellnessIcon,
    color: '#785DED',
    href: 'vocational',
  },
];

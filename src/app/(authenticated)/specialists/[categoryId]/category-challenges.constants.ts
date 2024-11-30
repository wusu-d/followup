import AssertivenessIcon from '@/components/icons/AssertivenessIcon';
import BenefitFindingIcon from '@/components/icons/BenefitFindingIcon';
import EmotionalAwarenessIcon from '@/components/icons/EmotionalAwarenessIcon';
import EmotionalWellnessIcon from '@/components/icons/EmotionalWellnessIcon';
import FutureFocusIcon from '@/components/icons/FutureFocusIcon';
import InnovativenessIcon from '@/components/icons/InnovativenessIcon';
import InternalLocusOfControlIcon from '@/components/icons/InternalLocusOfControlIcon';
import LearningIcon from '@/components/icons/LearningIcon';
import MeaningOfLifeIcon from '@/components/icons/MeaningOfLifeIcon';
import ProblemSolvingIcon from '@/components/icons/ProblemSolvingIcon';
import SpiritualWellnessIcon from '@/components/icons/SpiritualWellnessIcon';
import VocationalWellnessIcon from '@/components/icons/VocationalWellnessIcon';

interface ChallengeInfo {
  icon: React.ComponentType;
  color: string;
}

type ChallengeMap = Record<string, ChallengeInfo>;

export const challengesMapping: ChallengeMap = {
  Ambition: {
    icon: EmotionalWellnessIcon,
    color: '#4A55A2',
  },
  Assertiveness: {
    icon: AssertivenessIcon,
    color: '#4FC0D0',
  },
  'Benefit Finding': {
    icon: BenefitFindingIcon,
    color: '#FF2171',
  },
  'Emotional Awareness': {
    icon: EmotionalAwarenessIcon,
    color: '#0A6EBD',
  },
  'Future Focus': {
    icon: FutureFocusIcon,
    color: '#F86F03',
  },
  Innovativeness: {
    icon: InnovativenessIcon,
    color: '#17594A',
  },
  'Internal Locus of Control': {
    icon: InternalLocusOfControlIcon,
    color: '#FF78C4',
  },
  Learning: { icon: LearningIcon, color: '#00DFA2' },
  'Meaning of Life': { icon: MeaningOfLifeIcon, color: '#00C4FF' },
  Optimism: { icon: MeaningOfLifeIcon, color: '#00C4FF' },
  'Others Forgiveness': { icon: EmotionalWellnessIcon, color: '#4C4C6D' },
  Perseverance: {
    icon: SpiritualWellnessIcon,
    color: '#5C469C',
  },
  Proactivity: { icon: VocationalWellnessIcon, color: '#19A7CE' },
  'Problem Solving': { icon: ProblemSolvingIcon, color: '#FF6D60' },
  Resilience: { icon: MeaningOfLifeIcon, color: '#F7D060' },
  'Self Efficacy': { icon: ProblemSolvingIcon, color: '#FF6D60' },
  'Self Forgiveness': { icon: ProblemSolvingIcon, color: '#FF6D60' },
  Striving: { icon: ProblemSolvingIcon, color: '#FF6D60' },
};

export const categoryChallenges = [
  {
    id: 1,
    title: 'Ambition',
    icon: EmotionalWellnessIcon,
    color: '#4A55A2',
    href: 'ambition',
  },
  {
    id: 2,
    title: 'Assertiveness',
    icon: AssertivenessIcon,
    color: '#4FC0D0',
    href: 'assertiveness',
  },
  {
    id: 3,
    title: 'Benefit Finding',
    icon: BenefitFindingIcon,
    color: '#FF2171',
    href: 'benefit-finding',
  },
  {
    id: 4,
    title: 'Emotional Awareness',
    icon: EmotionalAwarenessIcon,
    color: '#0A6EBD',
    href: 'emotional-awareness',
  },
  {
    id: 5,
    icon: FutureFocusIcon,
    title: 'Future Focus',
    color: '#F86F03',
    href: 'future-focus',
  },
  {
    id: 6,
    title: 'Innovativeness',
    icon: InnovativenessIcon,
    color: '#17594A',
    href: 'innovativeness',
  },
  {
    id: 7,
    title: 'Internal Locus of Control',
    icon: InternalLocusOfControlIcon,
    color: '#FF78C4',
    href: 'internal-locus-of-control',
  },
  {
    id: 8,
    title: 'Learning',
    icon: LearningIcon,
    color: '#00DFA2',
    href: 'learning',
  },
  {
    id: 9,
    title: 'Meaning of Life',
    icon: MeaningOfLifeIcon,
    color: '#00C4FF',
    href: 'meaning-of-life',
  },
  {
    id: 10,
    title: 'Others Forgiveness',
    icon: EmotionalWellnessIcon,
    color: '#4C4C6D',
    href: 'others-forgiveness',
  },
  {
    id: 11,
    icon: SpiritualWellnessIcon,
    title: 'Perseverance',
    color: '#5C469C',
    href: 'perseverance',
  },
  {
    id: 12,
    title: 'Proactivity',
    icon: VocationalWellnessIcon,
    color: '#19A7CE',
    href: 'proactivity',
  },
  {
    id: 13,
    title: 'Problem Solving',
    icon: ProblemSolvingIcon,
    color: '#FF6D60',
    href: 'problem-solving',
  },
  {
    id: 14,
    title: 'Resilience',
    icon: MeaningOfLifeIcon,
    color: '#F7D060',
    href: 'resilience',
  },
];

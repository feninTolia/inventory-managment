import { Star } from 'lucide-react';

type Props = {
  rating: number;
};

export const RatingBlock = ({ rating }: Props) => {
  return [1, 2, 3, 4, 5].map((star) => (
    <Star
      key={star}
      className="w-4 h-4"
      color={star <= rating ? '#FFC107' : '#E4E5E9'}
    />
  ));
};

import { Rating } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { healthCheckColor } from '../helpers/patients';

type BarProps = {
  rating: number;
  showText: boolean;
};

// Custom styled Rating that receives color as prop
const StyledRating = styled(Rating)<{ iconcolor: string }>(({ iconcolor }) => ({
  '& .MuiRating-iconFilled': {
    color: iconcolor,
  },
}));

const HEALTHBAR_TEXTS = [
  "The patient is in great shape",
  "The patient has a low risk of getting sick",
  "The patient has a high risk of getting sick",
  "The patient has a diagnosed condition",
];

const HealthRatingBar = ({ rating, showText }: BarProps) => {
  const color = healthCheckColor(rating);
  return (
    <div className="health-bar">
      <StyledRating
        readOnly
        value={4 - rating}
        max={4}
        icon={<Favorite fontSize="inherit" />}
        iconcolor={color}
      />
      {showText ? <p>{HEALTHBAR_TEXTS[rating]}</p> : null}
    </div>
  );
};

export default HealthRatingBar;

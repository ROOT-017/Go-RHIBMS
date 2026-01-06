import './rating.scss';
import { IntRange } from '../../@types';

type NumberScalRatingProp = {
  inActiveTextColor?: string;
  inActiveBackground?: string;
  questionTextColor?: string;
  activeBackground?: string;
  activeTextColor?: string;
  minLabel?: string;
  maxLabel?: string;
  scale?: IntRange<1, 20>;
  value?: IntRange<1, 20>;
  onChange?: (value: number) => void;
};
export const NumberScaleRating = ({
  inActiveBackground = '#fff',
  inActiveTextColor = '#000000',
  activeBackground = '#E9F1FA',
  activeTextColor = '#241773',
  questionTextColor = '#000000',
  minLabel = '',
  maxLabel = '',
  scale = 10,
  value,
  onChange,
}: NumberScalRatingProp) => {
  return (
    <div className="nps-rating-wrapper">
      <div className="ns-rating-content" style={{ gridTemplateColumns: `repeat(${scale}, 1fr)`}}>
        {Array(scale)
          .fill(1)
          .map((_, i) => {
            const styles = {
              backgroundColor:
                Number(value) === i + 1 ? activeBackground : inActiveBackground,
              color:
                Number(value) === i + 1 ? activeTextColor : inActiveTextColor,
            };

            return (
              <div
                className="nps-rating-box"
                key={i + 1}
                data-rating={i + 1}
                style={styles}
                onClick={(e) => {
                  onChange?.(parseInt(e.currentTarget.dataset.rating || '0'));
                }}
              >
                <span>{i + 1}</span>
              </div>
            );
          })}
      </div>
      {minLabel || maxLabel ? (
        <div className="nps-rating-label-wrapper">
          <div
            style={questionTextColor ? { color: questionTextColor } : {}}
            className="nps-rating-label"
          >
            {minLabel || ''}
          </div>
          <div
            style={questionTextColor ? { color: questionTextColor } : {}}
            className="nps-rating-label"
          >
            {maxLabel || ''}
          </div>
        </div>
      ) : null}
    </div>
  );
};

import { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

interface LearnMoreSpanProps extends HTMLAttributes<HTMLSpanElement> {
  to?: string;
  text?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}

interface LearnMorePEltProps extends HTMLAttributes<HTMLParagraphElement> {
  to?: string;
  text?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}

const LearnMore = ({
  span,
  p,
}: {
  span?: LearnMoreSpanProps;
  p?: LearnMorePEltProps;
}) => {
  return (
    <Link
      to={span ? span.to ?? '#' : p ? p.to ?? '#' : '#'}
      target={span?.target ? span?.target : p?.target ? p?.target : '_blank'}
    >
      {span ? (
        <span className=" text-blueColor hover:underline " {...span}>
          {span.text ?? 'Learn more'}
        </span>
      ) : (
        <p className=" text-blueColor hover:underline w-fit " {...p}>
          {p?.text ?? 'Learn more'}
        </p>
      )}
    </Link>
  );
};

export default LearnMore;

import { Tooltip } from 'react-tooltip';
import styled from '@emotion/styled';
import { format } from 'date-fns';

import { PullRequestIcon } from '@/app/components/Icons';
import { formatIntoRelativeDate } from '@/lib/utils';

const StyledTooltip = styled(Tooltip)``;

const Item = styled.div`
  display: flex;
  gap: 17px;
`;

const StyledTitle = styled.a`
  font-size: 24px;
  font-weight: 400;
  color: #474747;
  margin: 0;
  text-decoration: none;

  @media (max-width: 810px) {
    font-size: 20px;
  }
`;

const StyledDescription = styled.div`
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  color: #b3b3b3;

  @media (max-width: 810px) {
    font-size: 18px;
  }
`;

const StyledPullRequestIcon = styled(PullRequestIcon)`
  @media screen {
    width: 20px;
    height: 20px;
  }
`;

interface PullRequestItemProps {
  id: string;
  title: string;
  url: string;
  createdAt: string;
  mergedAt: string | null;
  authorId: string;
}

export const PullRequestItem = ({
  id,
  title,
  url,
  createdAt,
  mergedAt,
  authorId,
}: PullRequestItemProps) => {
  const prNumber = url.split('/').slice(-1)[0];
  return (
    <Item key={id}>
      <div>
        <StyledPullRequestIcon
          color={mergedAt ? '#915FFD' : '#1A7F37'}
          size="M"
        />
      </div>
      <div>
        <StyledTitle href={url} target="_blank">
          {title}
        </StyledTitle>
        <StyledDescription>
          #{prNumber} by {authorId.slice(1)} was{' '}
          {mergedAt ? `merged` : `opened`}{' '}
          <span id={`date-${prNumber}`}>
            {formatIntoRelativeDate(mergedAt ? mergedAt : createdAt)}
          </span>
          <StyledTooltip
            anchorSelect={`#date-${prNumber}`}
            content={format(
              new Date(mergedAt ? mergedAt : createdAt),
              'dd MMMM yyyy',
            )}
            clickable
            noArrow
          />
        </StyledDescription>
      </div>
    </Item>
  );
};

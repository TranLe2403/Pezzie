import { useEffect, useState } from "react";
import { millisecondsToMinutes } from "date-fns";
import styled from "styled-components";

import { PezziePost, PezzieAvatar } from "../../App";

const PostItemContainer = styled.div`
  display: flex;
  background: white;
  width: 100%;
  border-radius: 4px;
  width: 100%;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.16);
`

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 16px;
`

const NoMarginTopText = styled.p`
  margin-top: 0;
  display: flex;
  flex-wrap: wrap;
`

const TimeStampStyle = styled.p`
  margin: 0;
  font-size: 14px;
`

const NoMarginHeading = styled.h4`
  margin: 0;
`

const HeadingContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 16px;
  margin-bottom: 8px;
`

const PostItem = ({ data }: { data: PezziePost }) => {
  const [timeInMin, setTImeInMin] = useState<number>(0)
  let interval: NodeJS.Timer

  useEffect(() => {
    interval = setInterval(() => {
      const subTime = new Date().getTime() - data.timestamp
      const timeInMinute = millisecondsToMinutes(subTime)
      setTImeInMin(timeInMinute)
    }, 60000)

    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <PostItemContainer>
      <PezzieAvatar />
      <ContentDiv>
        <HeadingContainer>
          <NoMarginHeading data-testid="username">{data.username}</NoMarginHeading>.
          <TimeStampStyle data-testid="timestamp"> {timeInMin === 0 ? 'Just post' : `${timeInMin}m`}</TimeStampStyle>
        </HeadingContainer>
        <NoMarginTopText data-testid="post">{data.postText}</NoMarginTopText>
      </ContentDiv>
    </PostItemContainer>
  )
}

export default PostItem;
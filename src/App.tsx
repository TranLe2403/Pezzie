import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidV4 } from 'uuid';

import SendIcon from './assets/send.png'
import PostItem from './components/PostItem';

export interface PezziePost {
  id: string,
  timestamp: number,
  postText: string,
  username: string,
  avatar: string;
}

interface PostListContainerProps {
  hasMarginTop: Boolean;
}

const StyledApp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const PezzieContainer = styled.div`
  width: 100%;
  padding: 32px;
  background: #91b6c5;
  height: fit-content;
  display: flex;
  align-items: center;
  flex-direction: column
`

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  background: white;
  height: 72px;
  align-items: center;
  border-radius: 4px;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.16);
`

const PezzieInput = styled.input`
  width: fit-content;
  height: 24px;
  border-radius: 16px;
  border: none;
  background: #f0fafd;
  flex: auto;
  padding: 8px 16px;
  border: solid 1px #F0F0F0;
`

const PezzieButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(0deg, hsla(296, 86%, 89%, 1) 4%, hsla(296, 86%, 63%, 1) 84%);
  border: none;
  margin: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const PezzieAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #9de8f2;
  margin: 16px;
`

const PostListContainer = styled.div<PostListContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-top: ${props => props.hasMarginTop ? "32px" : 0};
`

const ImgStyle = styled.img`
  width: 24px;
  height: 24px;
`

function App() {
  const [postText, setPostText] = useState<string>('');
  const [postArray, setPostArray] = useState<PezziePost[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostText(e.target.value)
  }

  // Mock function to get avatar for user
  const getAvatar = (_username: string) => {
    return ''
  }

  const handleClick = () => {
    if(postText === '') return;
    const postItem = {
      id: uuidV4(),
      timestamp: new Date().getTime(),
      postText: postText,
      username: 'Mr.Pezzie',
      avatar: getAvatar('Mr.Pezzie'),
    }
    setPostArray(postArray.concat(postItem))
    setPostText('')
  }

  const get3LatestItems = () => {
    const numberOfItem = postArray.length
    return postArray.slice((numberOfItem < 3 ? 0 : numberOfItem - 3), numberOfItem)
  }

  return (
    <StyledApp>
      <PezzieContainer>
        <InputContainer >
          <PezzieAvatar/>
          <PezzieInput data-testid="post-inputfield" placeholder="What's going on?" type="text" value={postText} onChange={handleChange} />
          <PezzieButton data-testid="send-button" onClick={handleClick}>
            <ImgStyle src={SendIcon} />
          </PezzieButton>
        </InputContainer>

        <PostListContainer hasMarginTop={!(postArray.length === 0)}>
          {get3LatestItems().reverse().map((item) => (
            <PostItem key={item.id} data={item} />
          ))}
        </PostListContainer>
      </PezzieContainer>
    </StyledApp>
  );
}

export default App;

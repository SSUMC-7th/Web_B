import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Notify = ({ userEmail }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!userEmail) {
      alert("로그인이 필요한 서비스입니다!");
      navigate("/login");
    } else {
      const username = userEmail.split("@")[0];
      alert(`${username}님! 신청이 완료되었습니다!`);
      navigate("/");
    }
  };

  return (
    <Container>
      <Header>제2회 🌟 왓챠 예상 별점 블라인드 시사회 개최</Header>
      <Date>2024.11.11</Date>
      <ImageContainer>
        <Image src="https://via.placeholder.com/800x450" alt="시사회 이미지" />
      </ImageContainer>
      <Description>
        영화에 대한 어떤 정보도 없이, 오직 내 예상 별점만 믿고 감상하는 예상
        별점 블라인드 시사회.
        <Highlight>전국상영위원회</Highlight>가 당신을 제2회 예비시사회에
        초대합니다.
      </Description>
      <SubHeader>🎥 시사회 일정</SubHeader>
      <Schedule>
        • 일시: 11. 22(금) 20:00 ~ 22:00 (2시간)
        <br />
        • 장소(택1): 동시 진행되는 아래 두 극장 중 한 곳만 선택하여 신청해
        주세요.
        <br />
        1) 부산 모둠이 극장 (부산광역시 중구 광복중앙로13 3층)
        <br />
        2) 서울 CGV 신촌아트레온 (서울 서대문구 신촌로 129 아트레온)
      </Schedule>
      <SubHeader>📅 신청 일정</SubHeader>
      <Schedule>
        • 예매 신청 기간: 11. 11(월) ~ 11. 17(일)
        <br />• 당첨 안내: 11. 18(월) 당첨자 한 해 문자메시지 안내와 왓챠피디아
        앱푸시 알림
      </Schedule>
      <Notice>
        📌 <strong>꼭 읽어주세요!</strong>
        <br />
        예비시사회는 해당 작품의 예상 별점이 3.5이상에 해당되는 분들로 초대될
        예정이에요.
        <br />
        왓챠(왓챠피디아)에 평가된 작품의 개수가 너무 적다면 당첨자 선정에 제외될
        수 있어요.
      </Notice>
      <ActionButton onClick={handleClick}>
        제2회 블라인드 시사회 신청하기
      </ActionButton>
      <Footer>
        왓챠피디아 서비스 이용 약관 · 개인정보 처리 방침 · 왓챠 서비스 이용 약관
        · 청소년 보호정책 · 고객센터 · 채용정보
        <br />
        고객센터(이용 및 결제 문의) | cs@watcha.co.kr | 02-515-9985 (무료)
        <br />
        왓챠 기업용 서비스 문의 | b2b-sales@watcha.com / 기업용 서비스 제안서
        다운로드
        <br />
        제휴 및 대외 협력 | https://watcha.team/contact
        <br />
        B2B 구독권 구매 문의 | 쿠팡페이 (jinu1005@coonc.com)
        <br />
        주식회사 왓챠 | 대표 박태훈 | 서울특별시 서초구 강남대로 343 신덕빌딩
        3층
        <br />
        사업자등록번호 211-88-66013 | 통신판매업 신고번호 2019-서울서초-0965호
        <br />
        호스팅 서비스 제공자 아마존웹서비스코리아 유한회사
        <br />
        WATCHA Copyright © 2024 by Watcha, Inc. All rights reserved.
        <br />
        <SocialIcons>
          <SocialIcon href="#">F</SocialIcon>
          <SocialIcon href="#">X</SocialIcon>
          <SocialIcon href="#">I</SocialIcon>
          <SocialIcon href="#">B</SocialIcon>
        </SocialIcons>
      </Footer>
    </Container>
  );
};

export default Notify;

const Container = styled.div`
  padding: 40px;
  background-color: black;
  color: white;
  max-width: 800px;
  margin: auto;
  text-align: center;
`;

const Header = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Date = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 30px;
`;

const ImageContainer = styled.div`
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const Highlight = styled.span`
  color: #e50914;
  font-weight: bold;
`;

const SubHeader = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Schedule = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const Notice = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #bbb;
  margin-bottom: 30px;
  text-align: left;
`;

const ActionButton = styled.button`
  background-color: #e50914;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #d10813;
  }
`;

const Footer = styled.footer`
  margin-top: 40px;
  font-size: 12px;
  color: #666;
  text-align: center;
`;

const SocialIcons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const SocialIcon = styled.a`
  background-color: white;
  color: black;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  text-decoration: none;
  &:hover {
    background-color: #ccc;
  }
`;

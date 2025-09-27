import ScreenHeaderPure from "@/components/ScreenHeaderPure";
import { Colors } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import CloseButton from "@/components/CloseButton";

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.light.background};
`;

const SafeArea = styled(SafeAreaView)`
  flex: 1;
`;

const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 24px;
`;

const TitleText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #6b7280;
  margin-bottom: 16px;
`;

const SubtitleText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: #9ca3af;
`;

const HeaderContainer = styled.View`
  padding-horizontal: 24px;
  padding-vertical: 16px;
  align-items: flex-end;
`;

const BackButton = styled(TouchableOpacity)`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
`;

const BackButtonText = styled.Text`
  font-size: 18px;
  color: #000000;
  font-weight: bold;
`;

export default function TasksListScreen() {
  const router = useRouter();

  return (
    <Container>
      <SafeArea>
        <HeaderContainer>
          <CloseButton onPress={() => router.push("/")} />
        </HeaderContainer>

        <ContentContainer>
          <TitleText>🚧 En Desarrollo</TitleText>
          <SubtitleText>
            Esta funcionalidad estará disponible próximamente
          </SubtitleText>
        </ContentContainer>
      </SafeArea>
    </Container>
  );
}

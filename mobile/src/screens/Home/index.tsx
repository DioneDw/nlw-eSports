import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/Gamecard';
import { useEffect, useState } from 'react';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

export function Home() {

  const [games,setGames] = useState<GameCardProps[]>([]);

  useEffect(() => {
    fetch('http://192.168.2.8:3333/games ')
    .then(response => response.json())
    .then(data => setGames(data))
  }, []);

   
  const navigation = useNavigation();
  function handleOpenGame({id, name,bannerUrl} : GameCardProps)
  {
   navigation.navigate('game',{id,name,bannerUrl} );
  }

  return (
    <Background>
    <SafeAreaView style={styles.container}>
      <Image source={logoImg} style={styles.logo} />

      <Heading 
      title="Encontre seu duo!"
      subtitle="Selecione o game que deseja jogar..."
       />

      <FlatList 
      data={games} 
      keyExtractor={ item => item.id}
      renderItem= {({ item }) => (
      <GameCard 
       data={item} 
       onPress={() => handleOpenGame(item)}
       /> 
      )}
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={styles.contentList}
      />
    </SafeAreaView>
    </Background>
  );
}
# 🦁 Pequenos Smarters

Jogo educacional de **alfabetização** para crianças de **6 a 8 anos**, desenvolvido como Trabalho de Conclusão de Curso (TCC).

## 📖 Sobre o projeto

O **Pequenos Smarters** é um aplicativo mobile que ensina a ler e escrever de forma lúdica, por meio de **ilhas temáticas** e atividades interativas. A criança explora ilhas flutuantes acompanhada dos mascotes **Ziggy** (leão), **Lina** (elefanta) e **Pipo** (macaco), enfrentando o vilão **Doutor Preguiça**.

## ✨ Funcionalidades

- 🏝️ **Ilha da Natureza** completa, com 3 atividades:
  - **Floresta das Vogais** — encontrar as vogais escondidas
  - **Lago das Letras** — identificar as consoantes
  - **Campo das Letras** — descobrir com qual letra a palavra começa
- ⭐ Sistema de **pontuação por estrelas** (1 a 3) com feedback imediato de acerto e erro
- 👨‍👩‍👧 **Painel dos Pais** — acompanhamento do progresso e desempenho da criança
- 🔐 **Cadastro e login** (dados do responsável + nome e idade da criança)
- 🎵 **Música de fundo** e **efeitos sonoros** (clique, acerto e erro)
- ⚙️ **Configurações** — som, voz, idioma e modo daltonismo
- 📱 Interface **horizontal**, colorida e pensada para o público infantil

## 🛠️ Tecnologias e ferramentas

- **React Native** + **Expo** (SDK 54)
- **Supabase** — autenticação e banco de dados **PostgreSQL**
- **React Navigation** — navegação entre telas
- **react-native-svg** — gráficos vetoriais · **expo-audio** — áudio
- **EAS Build** — geração do APK
- **Figma** (design) · **VS Code** (código) · **GitHub** (versionamento) · **Trello** (organização)

## 🚀 Como executar (desenvolvimento)

> Pré-requisitos: **Node.js** instalado e o app **Expo Go** no celular.

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o projeto
npx expo start
```

Depois, escaneie o **QR Code** com o app **Expo Go** (Android) para abrir o jogo.

## 📦 Gerar o APK

```bash
# instalar o EAS CLI (apenas uma vez)
npm install -g eas-cli

# fazer login na conta Expo
eas login

# gerar o APK
eas build -p android --profile preview
```

Ao final, o EAS fornece um **link/QR Code** para baixar e instalar o `.apk`.

## 📁 Estrutura do projeto

```
assets/            imagens, fontes e sons
src/
  components/      componentes reutilizáveis (barra do topo, botões, estrela...)
  screens/         telas do app (início, login, cadastro, ilha, painel...)
  game/            mecânicas e fases do jogo
  data/            conteúdo das atividades (vogais, consoantes, palavras...)
  navigation/      navegação e contextos (autenticação e áudio)
  services/        integração com o Supabase
  utils/           cores, fontes e utilitários
```

## 👩‍💻 Autoras

Projeto desenvolvido como TCC por **Rafaela** e **Estefanie**.

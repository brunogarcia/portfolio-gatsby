---
template: BlogPost
type: experiment
path: /vue-magic-the-gathering
date: 2020-04-07T14:59:36.571Z
title: Vue & Magic The Gathering
metaDescription: Vue, Vuex, Vuetify and the API of Magic The Gathering
thumbnail: https://res.cloudinary.com/pastelitos/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1607785519/bruno/vue-magic_beohsn.png
---
# Description

This app uses the API of Magic The Gathering to request a [list of cards](https://docs.magicthegathering.io/#api_v1cards_list).

Features:
- Search by the card name
- Filter  the list of the cards by the card type
- Order the list of the cards by name
- Display a card
- Display a random card
- Save a favorite card

# Tech

Made with [Vue](https://vuejs.org/), [Vuex](https://vuex.vuejs.org/), [Vuetify](https://vuetifyjs.com/) and the [API of Magic The Gathering](https://docs.magicthegathering.io/).

Unit testing with [Vue Testing Library](https://testing-library.com/docs/vue-testing-library/intro).

The [Github Action](https://github.com/brunogarcia/vue-magic-the-gathering/blob/master/.github/workflows/main.yml):
- Install the dependencies
- Execute the linter
- Execute the unit tests
- Builds the project on production mode
- Deploys the project in Netlify

# See in action

[https://vue-magic-the-gathering.netlify.app](https://vue-magic-the-gathering.netlify.app)

# Github

Check out the source code on Github.

[https://github.com/brunogarcia/vue-magic-the-gathering](https://github.com/brunogarcia/vue-magic-the-gathering)

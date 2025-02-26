import { createEvent, createStore } from 'effector'

 const setLanguage = createEvent<string>()
 const $language = createStore<string>('ru').on(setLanguage, (_, lang) => lang)


 export {
   $language,
   setLanguage
 }
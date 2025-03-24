export { loadNews, fetchNewsQuery } from './api/fetch-news'
export {
  $querySearch,
  $querySorting,
  $queryTake,
  $queryCategory,
  setLastTimeFetch,
  resetQueryCategory
} from './model/query-string'
export { NewsPreviewObserver } from './ui/NewsPreviewObserver'

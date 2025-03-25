// import { ContentNode } from '@entities/news'

// interface RenderNodeNewsProps {
//   node: ContentNode
// }

// const voidElements = new Set([
//   'img',
//   'br',
//   'hr',
//   'input',
//   'meta',
//   'link',
//   'base',
//   'area',
//   'col',
//   'embed',
//   'source',
//   'track',
//   'wbr'
// ])

// export const RenderNodeNews = ({ node }: RenderNodeNewsProps) => {
//   // Если это текстовый узел, возвращаем только текст
//   if (node.tag === 'text') {
//     return <>{node.text}</>
//   }

//   const Tag = node.tag.toLowerCase() as keyof JSX.IntrinsicElements

//   // Преобразуем атрибуты, заменяя 'class' на 'className'
//   const attributes = {
//     ...node.attributes,
//     className: node.attributes.class || undefined
//   }

//   // Если это void-элемент, рендерим его без дочерних элементов
//   if (voidElements.has(Tag)) {
//     return <Tag {...attributes} />
//   }

//   // Рендерим обычные элементы с атрибутами, текстом и дочерними узлами
//   return (
//     <Tag {...attributes}>
//       {node.text}
//       {node.children.length > 0 &&
//         node.children.map((child, index) => <RenderNodeNews key={index} node={child} />)}
//     </Tag>
//   )
// }

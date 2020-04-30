import matter from 'gray-matter';
import {escape} from 'querystring'
import { readdirSync, readFileSync } from 'fs';

export interface Posts {
  frontmatter: {
    [T:string]: any
    date?: string,
    title?: string,
  }
  slug: string,
  path: string
  content: string
}

const getPosts = (): Posts[] => {
  const files: Array<string> = readdirSync(`content/posts`)

  return files.map((filename) => {
    const path = `content/posts/${filename}`
    const file = readFileSync(path).toString()
    const { data, content } = matter(file);
    // Convert post date to format: Month day, Year
    //TODO: check config Date  
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = data.date.toLocaleDateString("en-US", options);

    const frontmatter: { date?: string, title?: string}  = {
      ...data,
      date: formattedDate,
    };

    return {
      slug: frontmatter.title
       ? escape(frontmatter.title.trim().replace(/ /g,'-'))
       : filename.replace(".md", ""),
      frontmatter,
      content,
      path,
    };
  })
}
  
export default getPosts
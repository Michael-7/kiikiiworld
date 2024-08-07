This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Currently deployed here -> [kiikiiworld](https://kiikiiworld.netlify.app/)

## Requirements
- Node

## Getting Started
- Start a terminal in the **/frontend** folder with `cd frontend` if you open the terminal at the root of the project
- run `npm install`
- run `npm run dev`
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Blog Posts
The `/frontend/content/blog` contain all the posts on the website, you can add new `.mdx` files to create new posts.
When making new posts make sure to fill the **title, date and category** properly, these are required.
When linking to images in a post make sure the image is included in the `/frontend/public/blog` folder. Don't forget the file extension (.png or .jpg).

### Formatting Images
Formatting images is good to optimize your website, when your images are too big the website will load slower. I created a script that formats all the images in the `/frontend/format-img` to a width of 1200px and outputs them into the `/frontend/format-img/out` folder. You can also format images yourself in photoshop you can also tools like ImageOptim (on mac) to compress your image.

1. Put images in `/frontend/format-img` folder.
2. Run `node format-img.js` in the `/frontend` folder.
3. Move the images from the `/frontend/format-img/out` folder to the `/frontend/public/blog` folder to use them.

## Styling
The colors of the website change if your device is set on dark mode or light mode. You can change the colors and spacing of the website in this file `/frontend/src/css/globals.scss`. changing the `--content-width` to `1000px` will scale your images bigger when viewing them on a desktop for example. If you don't want the theme to be different if your device is on dark mode you can remove the `@media (prefers-color-scheme: dark)` section.

## Deployment
How do you get it live?

### Netlify
Create a Netlify account and create a new project, link it with your github project and use these settings:
- Base directory: **/frontend**
- Build command: **npm run build:pipe**
- publish directory: **/frontend/out**

### ~~Terraform~~ (Dont use yet)
In the future you could use the the terragrunt and terraform files to deploy the static site to AWS with Cloudfront and S3.
The route53 part is not done yet, if you get a domain you need to fix that part.

To deploy everything at once run this is the `deployment/prd` folder

```bash
    terragrunt run-all apply
```
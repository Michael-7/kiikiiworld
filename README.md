This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Formatting Images
1. Put images in format-img folder.
2. Run `node format-img.js` in the frontend folder.
3. Move the images from the `/format-img/out` folder to the `public/blog` folder to use them.

## Deployment
In the future you could use the the terragrunt and terraform files to deploy the static site to AWS with Cloudfront and S3.
The route53 part is not done yet, if you get a domain you need to fix that part.

To deploy everything at once run this is the `deployment/prd` folder

```bash
    terragrunt run-all apply
```
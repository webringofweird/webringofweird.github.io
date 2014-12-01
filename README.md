# [webring of weird](https://webringofweird.github.io)

**ALWAYS UNDER CONSTRUCTION**

![UNDER CONSTRUCTION](./img/construction.gif)

## How to get into the Webring

- Fork this repository.
- Edit `sites.json` to add your site data.
- Test it locally to make sure the site works! (see the *Testing* section below if you don't know how to do this).
- Send a [Pull Request](https://github.com/webringofweird/webringofweird.github.io/compare/).
- If your site is weird enough we'll merge it in and it will appear in the webring.

## How to show the webring widget

Add the widget code to your site so it displays the webring widget:

```html
<script src="https://webringofweird.github.io/data/widget.js" data-url="{YOUR_URL}" async></script>
```

Make sure to replace *{YOUR_URL}* with the same site URL you added to `sites.json` or else the prev/next links won't be displayed correctly.

## Testing

The best way to make sure your changes work is to launch a local server and navigate to `index.html`. If the data loads and the webring is displayed, you should be OK.

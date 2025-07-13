import { Router } from "express";
import userRouters from "./usersRouter/index";
import adminRouters from "./adminRouter/intex"
const router = Router();

router.use("/", userRouters);
router.use("/v1/users", userRouters);
router.use("/v2/admin", adminRouters);

router.get('/sitemap.xml', (req, res) => {
    try {
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->
<url>
  <loc>https://rameswaram-homam.com/</loc>
  <lastmod>2025-07-12T05:46:15+00:00</lastmod>
  <priority>1.00</priority>
</url>
<url>
  <loc>https://rameswaram-homam.com/home</loc>
  <lastmod>2025-07-12T05:46:15+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://rameswaram-homam.com/tariff</loc>
  <lastmod>2025-07-12T05:46:15+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://rameswaram-homam.com/gallery</loc>
  <lastmod>2025-07-12T05:46:15+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://rameswaram-homam.com/about</loc>
  <lastmod>2025-07-12T05:46:15+00:00</lastmod>
  <priority>0.80</priority>
</url>.
<url>
  <loc>https://rameswaram-homam.com/contact</loc>
  <lastmod>2025-07-12T05:46:15+00:00</lastmod>
  <priority>0.80</priority>
</url>
</urlset>`;
        res.header('Content-Type', 'application/xml');
        res.send(sitemap);
    } catch (error) {
        res.send({ status: 500, message: "Internal Server Error!" })
    }
});

router.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send("User-agent: *\nAllow: /\nSitemap: https://rameswaram-homam.com/sitemap.xml");
});




export default router;
import { fetchStrapi } from "@/lib/strapi";
import { businessPopulate } from "@/lib/populates";
import { renderBlock } from "@/lib/blockRenderer";
import Modal from "@/components/Modal/Modal";
import Menu from "@/components/Menu/Menu";
import StrapiError from "@/components/StrapiError/StrapiError";

export default async function Business({ params }) {
  const { locale } = params;
  const strapiData = await fetchStrapi(
    process.env.BUSINESS_URL,
    locale,
    businessPopulate
  );

  if (!strapiData) {
    return <StrapiError locale={locale} />;
  }

  const { blocks } = strapiData;
  const modalData = blocks.find((b) => b.__component === "blocks.modal");
  const menuData = blocks.find((b) => b.__component === "blocks.menu");

  return (
    <>
      <main>{blocks.map(renderBlock)}</main>
      <Modal data={modalData} />
      <Menu data={menuData} />
    </>
  );
}

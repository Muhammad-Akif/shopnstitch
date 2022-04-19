import React from 'react'
import { Footer, Navbar, RelatedProducts } from '../../components'
import { getVarieties, getVarietyDetails } from '../../services'

const varietyDetails = ({ variety }) => {
  return (
    <>
      <Navbar />
      <div className="gap-8 grid sm:grid-cols-2 lg:grid-cols-3">
        {variety?.products.map(RelatedProducts)}
      </div>
      <RelatedProducts />
      <div class="absolute bottom-0">
        <Footer />
      </div>
    </>
  )
}

export default varietyDetails;

export async function getStaticPaths() { // all Variety slugs to generate paths 
  const varieties = await getVarieties();
  return {
    paths: varieties?.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const data = await getVarietyDetails(params?.slug);
  return {
    props: { variety: data }
  }
}
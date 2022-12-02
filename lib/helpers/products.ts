import { Product, Variant } from "../types/products";
import * as crypto from "crypto";

/**
 * Create a list of variants from the options || single variant in instance of no options. 
 * @param product: Product
 * @param options1: string[]
 * @param options2: string[]
 * @param options3: string[]
 * @returns Variant[]
 */
 export const createVariantsFromOptions = (
    product: Product,
    options1?: string[],
    options2?: string[],
    options3?: string[],
  ): Variant[] => {

    const SKU =  product.sku &&  product.sku !== "" ?  product.sku : product.title.toLocaleLowerCase().replaceAll(" ", "-")
  
    // Variant var instance returned
    let variants: Variant[] = [];
  
    // if only ONE option list exists, loop & create variants (ONE)
    if (options1?.length != 0 && options2?.length == 0 && options3?.length == 0) {
      options1?.forEach((v,i) => {
        variants.push({
          variant_id: "var_" + crypto.randomBytes(10).toString('hex'),
          product_id: product.id,
          sku: "" + SKU  + "--" + v.charAt(0).toLocaleUpperCase(),
          price: product.price,
          option1: v,
          option2: "",
          option3: "",
          quantity: product.quantity,
        });
      })
    }
  
    // if TWO option lists exists, loop & create variants (ONE * TWO)
    if (options1?.length != 0  && options2?.length != 0 &&  options3?.length == 0) {
      options1?.forEach((one,i) => {
        options2?.forEach((two,i) => {
          variants.push({
            variant_id: "var_" + crypto.randomBytes(10).toString('hex'),
            product_id: product.id,
            sku: "" + SKU  + "--" + one.charAt(0).toLocaleUpperCase() + "/" + two.charAt(0).toLocaleUpperCase(),
            price: product.price,
            option1: one,
            option2: two,
            option3: "",
            quantity: product.quantity,
          });
        });
      })
    }
  
    // if TWO option lists exists, loop & create variants (ONE * TWO * THREE)
    if (options1?.length != 0  && options2?.length != 0 && options3?.length != 0) {
      options1?.forEach((one,i) => {
        options2?.forEach((two,i) => {
          options3?.forEach((three,i) => {
            variants.push({
              variant_id: "var_" + crypto.randomBytes(10).toString('hex'),
              product_id: product.id,
              sku: ""+ SKU + "--" + one.charAt(0).toLocaleUpperCase() + "/" + two.charAt(0).toLocaleUpperCase() + "/" + three.charAt(0).toLocaleUpperCase(),
              price: product.price,
              option1: one,
              option2: two,
              option3: three,
              quantity: product.quantity,
            });
          });
        });
      })
    }
    return variants;
  }
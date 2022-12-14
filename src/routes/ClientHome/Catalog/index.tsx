import './style.css';


import SearchBar from '../../../components/SearchBar';
import CatalogCard from '../../../components/CatalogCard';
import ButtonNextPage from '../../../components/ButtonNextPage';


import * as productServices from '../../../services/product-services'
import { useEffect, useState } from 'react';
import { ProductDTO } from '../../../models/product';

type QueryParams = {
   page: number;
   name: string;
}

export default function Catalog() {

   const [isListPage, setisListPage] = useState(false);

   // Cria o estado gerenciado pelo React que contém os produtos
   const [product, setProduct] = useState<ProductDTO[]>([]);

   // Cria o estado gerenciado pelo React que contém os parâmetros de consulta
   const [queryParams, setQueryParams] = useState<QueryParams>({
      page: 0,
      name: ""
   });

   /*
      Executa uma operação assíncrona quando o estado queryParams é alterado.
      Nesse caso, a função productServices.findPageRequest é chamada com os valores dos campos page e name
      do estado queryParams, e o resultado é usado para atualizar o estado product com o conteúdo da resposta
      da chamada à função.
   */
   useEffect(() => {
      productServices.findPageRequest(queryParams.page, queryParams.name).then(response => {
         const nextPage = response.data.content;
         setProduct(product.concat(nextPage));
         setisListPage(response.data.last)
      })
   }, [queryParams]);

   /*
      Atualiza o estado queryParams com um novo valor para o campo name.
      Isso causa o disparo da função useEffect, o que resulta na atualização dos produtos
      exibidos na aplicação.
   */
   function handleSearch(searchText: string) {
      setProduct([]);
      setQueryParams({ ...queryParams, page: 0, name: searchText })
   }

   function handleNextPageClick() {
      setQueryParams({ ...queryParams, page: queryParams.page + 1 })
   }

   return (

      <main>
         <section id="catalog-section" className="dsc-container">
            <SearchBar onSearch={handleSearch} />

            <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">

               {
                  product.map(products => <CatalogCard key={products.id} product={products} />)
               }

            </div>

            {  
            !isListPage &&
               <div onClick={handleNextPageClick}>
                  <ButtonNextPage></ButtonNextPage>
               </div>
            }


         </section>
      </main>

   );
}
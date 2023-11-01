import React, { useMemo } from 'react'
import axios from 'axios'
import { useTable } from 'react-table'
import { object } from 'zod'

type Props = {}

const EmployeeTable = (props: Props) => {
    const [products, setProducts] = React.useState([])

    const fetchProducts = async () => {
        const response = await axios
            .get("https://fakestoreapi.com/products")
            .catch((err) => console.log(err));

        if (response) {
            const products = response.data;

            console.log("Products: ", products);
            setProducts(products);
        }
    };

    React.useEffect(() => {
        fetchProducts();
    }, [])

    const data = useMemo(
        () => [
            {
                id: 1,
                title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                price: 109.95,
                description:
                    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                category: "men's clothing",
                image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                rating: {
                    rate: 3.9,
                    count: 120,
                },
            },
            {
                id: 1,
                title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                price: 109.95,
                description:
                    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                category: "men's clothing",
                image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                rating: {
                    rate: 3.9,
                    count: 120,
                },
            },
            {
                id: 1,
                title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                price: 109.95,
                description:
                    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                category: "men's clothing",
                image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                rating: {
                    rate: 3.9,
                    count: 120,
                },
            },
        ],
        []
    );//useMemo met les données en cache pour ne pas les recharger à chaque fois

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "id",
            },
            {
                Header: "Price",
                accessor: "price",
            },
            {
                Header: "Title",
                accessor: "title",
            },
        ],
        []
    );

    const productsData = useMemo(() => [...products], [products])
    const productsColumns = useMemo(
        () =>
            products[0]
                ? Object.keys(products[0])
                    .filter((key) => key !== "rating")
                    .map((key) => {
                        if (key === "image")
                            return {
                                Header: key,
                                accessor: key,
                                Cell: ({ value }) => <img src={value} />,
                                maxWidth: 70,
                            };

                        return { Header: key, accessor: key };
                    })
                : [],
        [products]
    );

    const tableInstance = useTable({ columns: productsColumns, data: productsData })//takes 2 arguments, columns and data
    // const tableInstance = useTable({ columns, data })//takes 2 arguments, columns and data
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance
    return (
        <div className='text-base text-gray-900 table-fixed' {...getTableProps()}>
            {/* tableHeader */}
            {/*  p-2 */}
            <div className='w-full bg-gray-300'>
                {headerGroups.map(headerGroup => {
                    return (
                        // grid grid-cols-3
                        <div {...headerGroup.getHeaderGroupProps()} className='flex w-full h-full border border-green-500'>
                            {headerGroup.headers.map(column => {
                                return (
                                    <div {...column.getHeaderProps()} className='flex-1 p-2 break-words border border-green-500'>
                                        {column.render('Header')}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            {/* tableBody */}
            <div className='' {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        return (
                            <div {...row.getRowProps()} className='flex border border-green-500'>
                                {
                                    row.cells.map((cell, index) => {
                                        return (
                                            <div {...cell.getCellProps()} className='flex-1 p-5 border border-green-500' key={index}>
                                                {cell.render('Cell')}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default EmployeeTable
import React from 'react'
import { TableBody, TableHeader } from '../../components/ui/table';

type Props = {}

const List = (props: Props) => {

    /* Get the list of current employees */
    const storedData = localStorage.getItem("employees");
    const employees = storedData ? JSON.parse(storedData) : [];

    return (
        <div>
            <h1>Olive</h1>
            <TableBody>
                <TableHeader>

                </TableHeader>

            </TableBody>
        </div>
    )
}

export default List
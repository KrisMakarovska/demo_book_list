// import React from 'react';
import { useState } from "react";
import "./style/App.scss";
import booksFromServer from './api/booksFromServer.json';

import Button from '@mui/material/Button';
import { FormControl } from './Form';
import { EditForm } from './EditForm';
import { DataGridComp } from './DataGridComp';

import { RouterProvider } from 'react-router-dom';

import { Book } from './types/Book';

export const App = () => {

  const [allBooks, setAllBooks] = useState<Book[]>(booksFromServer);
  const [selectedRow, setSelectedRow] = useState<Book | null>(null);

  return (
    // <RouterProvider router={routerConst} />
    <>
      <div className="booklist" style={{ height: 500, width: '100%' }}>
        <Button 
          variant="contained"
        >
          Add Book
        </Button>

          <DataGridComp
            allBooks={allBooks}
            setSelectedRow={setSelectedRow}
          />

          {selectedRow && (
              <EditForm
                selectedRow={selectedRow}
                setSelectedRow={setSelectedRow}
              />
            )}
      </div>

      <div className="form">
        <FormControl />
      </div>
    </>
  )
};


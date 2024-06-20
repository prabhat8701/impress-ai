// src/components/mainComponent.js

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table, Button, Row, Col } from "antd";
import { getUsers, addUser, deleteUser, editedUser } from "../actions/userActions";
import InputHandler from "./commonInput";
import Swal from 'sweetalert2'


const MainComponent = ({ userState, getUsers, addUser, editedUser, deleteUser }) => {
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleAddUser = (user) => {
    addUser(user);
  };

  const handleEditUser = (user) => {
    
    setEditingUser(user);
  };

  const handleUpdateUser = (user) =>{
    console.log(user,editingUser.id)
    editedUser(editingUser.id, user);
    setEditingUser(null);
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: 'Do you want to Delete this User?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id);
        Swal.fire('DELETED!', '', 'info')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    //deleteUser(id);

  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => handleEditUser(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDeleteUser(record.id)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <InputHandler onSubmit={editingUser ? handleUpdateUser : handleAddUser} editMode={!!editingUser} initialData={editingUser} />

      <Row justify="center">
        <Col xs={22} sm={20} md={18} lg={16}>
          <Table dataSource={userState.users} columns={columns} rowKey="id" pagination={false} />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userState: state.userState,
});

export default connect(mapStateToProps, { getUsers, addUser, editedUser, deleteUser })(MainComponent);
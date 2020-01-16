import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import LoadingScreen from "react-loading-screen";
import { Table, Icon } from "antd";

const GET_USERS = gql`
    query {
        users {
            id
            firstName
            lastName
            email
        }
    }
`;

const columns = [
    {
        title: "Name",

        key: "firstName",
        render: record => (
            <span>
                {record.firstName} {record.lastName}
            </span>
        )
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email"
    },
    {
        title: "",
        key: "action",
        render: (text, record) => (
            <span>
                <Link to={`/user/${record.id}`}>
                    <Icon type="control" style={{ fontSize: 24 }} />
                </Link>
            </span>
        )
    }
];

const Users = () => {
    const { data, loading, error } = useQuery(GET_USERS);
    if (loading) return <LoadingScreen loading={true}></LoadingScreen>;
    if (error) return <p>error!</p>;
    if (!data) return <p>cnf</p>;
    if (!data.users) return <p>cnfu</p>;

    return <Table columns={columns} dataSource={data.users} rowKey="id" />;
};

export default Users;
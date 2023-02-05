import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import {useState} from 'react';
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import { API } from "../../config";


const Blogs = (props)=>{
    return <>
        <Layout>
            <main>
                <div className="container-head">
                    <div className="col-md-12 pt-3">
                        <h1 className="display-4 fw-bold text-center">Fetrah for islamic mirrage</h1>
                    </div>
                    <section>
                        <p className="me-2">show categories and tags</p>
                    </section>
                </div>

                <div className="container-fluid">
                    <div className="row justify-content-center align-items-center g-2">
                        <div className="col-md-12">Show all blogs</div>
                    </div>
                </div>
            </main>
        </Layout>
    </>
};

export default Blogs;
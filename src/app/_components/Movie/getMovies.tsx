import { Table } from "antd";
import { api } from "app/trpc/server";
import { movieColumns } from "./columns";

async function Movies() {

    const movies = await api.movie.getAll.query();

    return (
        <div className="max-w-[400px]" >
            <Table scroll={{ y: 400 }} rowKey="id" columns={movieColumns} dataSource={movies} />
        </div>

    );
}

export default Movies

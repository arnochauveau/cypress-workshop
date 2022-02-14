import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import paginate from "express-paginate";
import session from "express-session";
import logger from "morgan";
import passport from "passport";
import { join } from "path";
import { backendPort, frontendPort } from "../src/utils/portUtils";
import auth from "./auth";
import bankAccountRoutes from "./bankaccount-routes";
import bankTransferRoutes from "./banktransfer-routes";
import commentRoutes from "./comment-routes";
import contactRoutes from "./contact-routes";
import resolvers from "./graphql/resolvers";
import likeRoutes from "./like-routes";
import notificationRoutes from "./notification-routes";
import testDataRoutes from "./testdata-routes";
import transactionRoutes from "./transaction-routes";
import userRoutes from "./user-routes";

require("dotenv").config();

const corsOption = {
  origin: `http://localhost:${frontendPort}`,
  credentials: true,
};

const schema = loadSchemaSync(join(__dirname, "./graphql/schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const app = express();

app.use(cors(corsOption));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "session secret",
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(paginate.middleware(+process.env.PAGINATION_PAGE_SIZE!));

/* istanbul ignore next */
if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
  app.use("/testData", testDataRoutes);
}

app.use(auth);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schemaWithResolvers,
    graphiql: true,
  })
);

app.use("/users", userRoutes);
app.use("/contacts", contactRoutes);
app.use("/bankAccounts", bankAccountRoutes);
app.use("/transactions", transactionRoutes);
app.use("/likes", likeRoutes);
app.use("/comments", commentRoutes);
app.use("/notifications", notificationRoutes);
app.use("/bankTransfers", bankTransferRoutes);

app.use(express.static(join(__dirname, "../public")));

app.listen(backendPort);

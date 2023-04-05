import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Typography } from 'antd';

const pdfDocumentPlugin = {Document, Page, Text, View, StyleSheet};

const viewDocumentPlugin = {};

viewDocumentPlugin['Document'] = ({children, ...rest}) => <section {...rest}>{children}</section>;
viewDocumentPlugin['Page'] = ({children, ...rest}) => <section {...rest}>{children}</section>;
viewDocumentPlugin['Text'] = ({children, ...rest}) => <Typography.Text {...rest}>{children}<br/></Typography.Text>;
viewDocumentPlugin['View'] = ({...rest}) => <div {...rest} />;

export {viewDocumentPlugin, pdfDocumentPlugin};

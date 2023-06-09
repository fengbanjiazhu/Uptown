import { Card } from "antd";
const { Meta } = Card;
const ContactCard = () => (
  <Card
    hoverable
    style={{
      width: 300,
    }}
    cover={<img alt="uptown image" src={`${process.env.PUBLIC_URL}/images/Uptown.jpg`} />}
  >
    <Meta title="Address" description="123 Some St, Surry Hills NSW, 2010" />

    <Meta title="Phone" description="02 0000 0000" />

    <Meta title="Opening Hour" description="7 days 10am - 6pm" />
  </Card>
);
export default ContactCard;

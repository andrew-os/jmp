import React, { Component, Fragment } from 'react'


export default class ColumnContent extends Component {

    state = {
        height: 0
    }

    componentDidMount() {
        const height = this.divElement.clientHeight;
        this.setState({ height });
    }


    render() {
    const { title, date, categories, children } = this.props
    const {height} = this.state 

    console.log(height)
        return(
            <div 
                ref={ (divElement) => { this.divElement = divElement } } 
                className="lg:gr-6 gr-12 lg:order-1 order-2"
                style={{
                    height: `${height}px` 
                }}
            >
                
                {title && (
                    <h1 className="SinglePost--Title" itemProp="title">
                        {title}
                    </h1>
                
                )}
                    <div className="SinglePost--Meta">
                        {date && (
                        <time
                            className="SinglePost--Meta--Date"
                            itemProp="dateCreated pubdate datePublished"
                            date={date}
                        >
                            {date}
                        </time>
                        )}
                        {categories && (
                        <Fragment>
                            <span>|</span>
                            {categories.map((cat, index) => (
                            <span
                                key={cat.category}
                                className="SinglePost--Meta--Category"
                            >
                                {cat.category}
                                {/* Add a comma on all but last category */}
                                {index !== categories.length - 1 ? ',' : ''}
                            </span>
                            ))}
                        </Fragment>
                        )}
                    </div>
                    {children}
            </div>
        )

    }
}

"""empty message

Revision ID: 5e6de6d13535
Revises: 4d301ab49cbc
Create Date: 2023-10-09 19:56:24.347435

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5e6de6d13535'
down_revision = '4d301ab49cbc'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('attendance',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('position_code', sa.Integer(), nullable=False),
    sa.Column('wage', sa.Integer(), nullable=False),
    sa.Column('create_date', sa.DateTime(timezone=True), nullable=False),
    sa.Column('employee_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['employee_id'], ['employee.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_attendance_id'), 'attendance', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_attendance_id'), table_name='attendance')
    op.drop_table('attendance')
    # ### end Alembic commands ###
